import Destination from '../models/destinationModel.js';
import { uploadImage } from '../utils/uploadImage.js';

// @desc    Create a new destination (with image upload)
// @route   POST /api/destinations
// @access  Admin only
export const createDestination = async (req, res) => {
  try {
    const { name, city, category } = req.body;
    
    // Get admin ID from authenticated user (from protect middleware)
    const adminId = req.user._id;

    // Validation
    if (!name || !city || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, city, category',
      });
    }

    // Handle multiple image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, 'destinations')
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const destination = await Destination.create({
      name,
      city,
      category,
      images: imageUrls,
      created_by: adminId,
    });

    res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate('created_by', 'name email role profileImage')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error('Get all destinations error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single destination by ID
// @route   GET /api/destinations/:id
// @access  Public
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('created_by', 'name email role profileImage');
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error('Get destination by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update destination (with optional new images)
// @route   PUT /api/destinations/:id
// @access  Admin only
export const updateDestination = async (req, res) => {
  try {
    const { name, city, category, existingImages } = req.body;
    
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    // Optional: Check if the logged-in admin is the creator
    if (destination.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update destinations you created',
      });
    }

    // Handle new image uploads
    let imageUrls = existingImages ? JSON.parse(existingImages) : destination.images;
    
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, 'destinations')
      );
      const newImages = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newImages];
    }

    // Update fields
    destination.name = name || destination.name;
    destination.city = city || destination.city;
    destination.category = category || destination.category;
    destination.images = imageUrls;

    const updatedDestination = await destination.save();

    res.status(200).json({
      success: true,
      data: updatedDestination,
    });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Admin only
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    // Optional: Check if the logged-in admin is the creator
    if (destination.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete destinations you created',
      });
    }

    await destination.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete specific image from destination
// @route   DELETE /api/destinations/:id/images
// @access  Admin only
export const deleteDestinationImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    // Optional: Check ownership
    if (destination.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify destinations you created',
      });
    }

    destination.images = destination.images.filter((img) => img !== imageUrl);
    await destination.save();

    res.status(200).json({
      success: true,
      data: destination,
      message: 'Image removed successfully',
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get destinations by admin (for dashboard)
// @route   GET /api/destinations/admin/my
// @access  Admin only
export const getMyDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ created_by: req.user._id })
      .populate('created_by', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error('Get my destinations error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};