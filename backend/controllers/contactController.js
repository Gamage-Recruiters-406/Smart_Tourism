import mongoose from "mongoose";
import ContactMessage from "../models/ContactMessage.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Submit a contact message
// @route   POST /api/v1/contacts
// @access  Public
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, inquiry, userId } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required",
      });
    }

    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      inquiry,
    };

    if (userId) {
      if (!isValidId(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId",
        });
      }
      contactData.userId = userId;
    }

    const contact = await ContactMessage.create(contactData);

    let notificationsCreated = 0;
    try {
      const admins = await User.find({ role: "admin", isBlocked: false })
        .select("_id")
        .lean();

      if (admins.length > 0) {
        const notificationDocs = admins.map((admin) => ({
          userId: admin._id,
          title: "New contact request",
          message: `Contact from ${name} (${email}) - ${subject}`,
          type: "info",
          relatedId: contact._id,
          relatedType: "contact",
        }));

        const created = await Notification.insertMany(notificationDocs);
        notificationsCreated = created.length;
      }
    } catch (notificationError) {
      console.error("Create contact notification error:", notificationError);
    }

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: contact,
      notificationsCreated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit contact message",
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/v1/contacts
// @access  Admin only
export const getContactMessages = async (req, res) => {
  try {
    const { status, email, inquiry, search } = req.query;

    const filters = {};
    if (status) {
      filters.status = status;
    }
    if (email) {
      filters.email = email.toLowerCase();
    }
    if (inquiry) {
      filters.inquiry = inquiry;
    }
    if (search) {
      const searchRegex = new RegExp(search, "i");
      filters.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
        { inquiry: searchRegex },
      ];
    }

    const contacts = await ContactMessage.find(filters)
      .populate("userId", "name email role")
      .populate("handledBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
};

// @desc    Get a contact message by ID
// @route   GET /api/v1/contacts/:id
// @access  Admin only
export const getContactMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message id",
      });
    }

    const contact = await ContactMessage.findById(id)
      .populate("userId", "name email role")
      .populate("handledBy", "name email role");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact message",
      error: error.message,
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/v1/contacts/:id/status
// @access  Admin only
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message id",
      });
    }

    const allowedStatuses = ["new", "read", "resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const contact = await ContactMessage.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    contact.status = status;

    if (status === "new") {
      contact.handledBy = undefined;
      contact.handledAt = undefined;
    } else {
      contact.handledBy = contact.handledBy || req.user._id;
      if (status === "resolved") {
        contact.handledAt = new Date();
      }
    }

    const updatedContact = await contact.save();

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update contact status",
      error: error.message,
    });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/v1/contacts/:id
// @access  Admin only
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message id",
      });
    }

    const contact = await ContactMessage.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message",
      error: error.message,
    });
  }
};
