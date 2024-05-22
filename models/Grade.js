// models/Grade.js
import mongoose from 'mongoose';

const GradeSchema = new mongoose.Schema({
  learner_id: { type: Number, required: true },
  class_id: { type: Number, required: true },
  scores: [{ type: Number }],
});

const Grade = mongoose.model('Grade', GradeSchema);

export default Grade;
