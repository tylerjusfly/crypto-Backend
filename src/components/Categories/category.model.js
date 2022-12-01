const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'Women(Fashion)',
        'Men(Fashion)',
        'Electronics',
        'Toys & Collectibles',
        'Home',
        'Beauty',
        'Kids',
        'Vintage & collectibles',
        'Sports & outdoors',
        'Handmade',
        'Pet Supplies',
        'Garden & Outdoor',
        'Offices',
        'Real Estates',
        'Auto Parts',
        'Vehicles',
        'Books',
        'Movies',
        'Music',
        'Websites',
        'GiftCards',
        'Others'
      ],
      required: true,
      default: 'Electronics'
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
