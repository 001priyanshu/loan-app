const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'PAID','REJECT'],
    default: 'PENDING',
  },
});

module.exports = mongoose.model('Loan', loanSchema);
