import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedOption: Number,
});

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
    totalScore: Number,
    categoryScores: {
      stress: Number,
      focus: Number,
      positivity: Number,
    },
    suggestions: [
      {
        analysis: String,
        advice: [String],
        importantReminders: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
