import Package from '../models/packageModel.js';
import Destination from '../models/destinationModel.js';
import { uploadImage } from '../utils/uploadImage.js';

// @desc    Create a new travel package
// @route   POST /api/packages
// @access  Admin only
export const createPackage = async (req, res) => {
  try {
    const {
      name,
      destination,
      price,
      description,
      duration,
      included,
      excluded,
      availability,
      maxPeople,
    } = req.body;

    const adminId = req.user._id;

    // Validate destination exists
    const destinationExists = await Destination.findById(destination);
    if (!destinationExists) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    // Validation
    if (!name || !destination || !price || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, destination, price, description, duration',
      });
    }

    // Handle image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, 'packages')
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const packageData = await Package.create({
      name,
      destination,
      price,
      description,
      duration,
      included: included ? JSON.parse(included) : [],
      excluded: excluded ? JSON.parse(excluded) : [],
      images: imageUrls,
      availability: availability === 'false' ? false : true,
      maxPeople: maxPeople || 10,
      created_by: adminId,
    });

    // Populate destination info
    const populatedPackage = await Package.findById(packageData._id)
      .populate('destination', 'name city category images')
      .populate('created_by', 'name email');

    res.status(201).json({
      success: true,
      data: populatedPackage,
    });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate('destination', 'name city category images')
      .populate('created_by', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    console.error('Get all packages error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id)
      .populate('destination', 'name city category images description')
      .populate('created_by', 'name email');

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      data: packageData,
    });
  } catch (error) {
    console.error('Get package by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get packages by destination
// @route   GET /api/packages/destination/:destinationId
// @access  Public
export const getPackagesByDestination = async (req, res) => {
  try {
    const packages = await Package.find({ destination: req.params.destinationId })
      .populate('destination', 'name city category')
      .sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    console.error('Get packages by destination error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Admin only
export const updatePackage = async (req, res) => {
  try {
    const {
      name,
      destination,
      price,
      description,
      duration,
      included,
      excluded,
      existingImages,
      availability,
      maxPeople,
    } = req.body;

    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    // Check ownership
    if (packageData.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update packages you created',
      });
    }

    // Validate destination if being updated
    if (destination) {
      const destinationExists = await Destination.findById(destination);
      if (!destinationExists) {
        return res.status(404).json({
          success: false,
          message: 'Destination not found',
        });
      }
    }

    // Handle image uploads
    let imageUrls = existingImages ? JSON.parse(existingImages) : packageData.images;

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, 'packages')
      );
      const newImages = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newImages];
    }

    // Update fields
    packageData.name = name || packageData.name;
    packageData.destination = destination || packageData.destination;
    packageData.price = price || packageData.price;
    packageData.description = description || packageData.description;
    packageData.duration = duration || packageData.duration;
    packageData.included = included ? JSON.parse(included) : packageData.included;
    packageData.excluded = excluded ? JSON.parse(excluded) : packageData.excluded;
    packageData.images = imageUrls;
    packageData.availability = availability !== undefined ? availability === 'true' : packageData.availability;
    packageData.maxPeople = maxPeople || packageData.maxPeople;

    const updatedPackage = await packageData.save();

    const populatedPackage = await Package.findById(updatedPackage._id)
      .populate('destination', 'name city category')
      .populate('created_by', 'name email');

    res.status(200).json({
      success: true,
      data: populatedPackage,
    });
  } catch (error) {
    console.error('Update package error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Admin only
export const deletePackage = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    // Check ownership
    if (packageData.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete packages you created',
      });
    }

    await packageData.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Package deleted successfully',
    });
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete image from package
// @route   DELETE /api/packages/:id/images
// @access  Admin only
export const deletePackageImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    // Check ownership
    if (packageData.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify packages you created',
      });
    }

    packageData.images = packageData.images.filter((img) => img !== imageUrl);
    await packageData.save();

    res.status(200).json({
      success: true,
      data: packageData,
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

// @desc    Get packages by admin (my packages)
// @route   GET /api/packages/admin/my
// @access  Admin only
export const getMyPackages = async (req, res) => {
  try {
    const packages = await Package.find({ created_by: req.user._id })
      .populate('destination', 'name city category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    console.error('Get my packages error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};