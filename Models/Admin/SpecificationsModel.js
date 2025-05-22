const mongoose = require('mongoose');

const productSpecificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    
  },
  type: {
    type: String,
    required: true,
    enum: [
      'netWeight', 
      'fit', 
      'sleevesType', 
      'length', 
      'occasion', 
      'innerLining', 
      'material', 
      'pocket',
      'other'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true
});

// Add index for faster queries
// productSpecificationSchema.index({ name: 1, type: 1 }, { unique: true });

const ProductSpecification = mongoose.model('ProductSpecification', productSpecificationSchema);

module.exports = ProductSpecification;