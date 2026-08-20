import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  attendance: {
    type: Number,
    default: 0,
  },
  marks: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Student ||
  mongoose.model('Student', StudentSchema);
