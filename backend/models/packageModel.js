import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      example: '3 days / 2 nights',
    },
    included: {
      type: [String],
      default: [],
    },
    excluded: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    maxPeople: {
      type: Number,
      default: 10,
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

export default mongoose.model('Package', packageSchema);