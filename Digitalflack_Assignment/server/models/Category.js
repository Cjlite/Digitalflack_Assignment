const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    // required: true,
    enum: ["active", "inactive"],
  },
});

module.exports = mongoose.model('Category', CategorySchema);
