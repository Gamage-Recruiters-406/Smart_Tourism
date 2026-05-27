import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
    },

    city: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Beach', 'Mountain', 'Historical', 'City', 'Wildlife', 'Adventure', 'Cultural'],
    },

    images: {
      type: [String],
      default: [],
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Destination', destinationSchema);