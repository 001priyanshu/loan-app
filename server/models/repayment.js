const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID'],
    default: 'PENDING',
  },
});

module.exports = mongoose.model('Repayment', repaymentSchema);