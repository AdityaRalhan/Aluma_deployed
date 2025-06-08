import Assessment from '../models/Assessment.js';
import express from 'express';
import { analyzeAssessment } from '../models/utils/assessmentAnalysis.js';

// Helper: Calculate scores
const calculateScores = (answers) => {
  let total = 0;
  const rawCategoryScores = {
    stress: 0,
    focus: 0,
    positivity: 0,
  };

  answers.forEach((ans, i) => {
    total += ans.selectedOption;

    if (i < 3) rawCategoryScores.stress += ans.selectedOption;
    else if (i < 6) rawCategoryScores.focus += ans.selectedOption;
    else rawCategoryScores.positivity += ans.selectedOption;
  });

  const maxScores = {
    stress: 3 * 5,      // 15
    focus: 3 * 5,       // 15
    positivity: 4 * 5,  // 20
  };

  // Normalize scores to 0-10 scale
  const categoryScores = {
    stress: Math.round((rawCategoryScores.stress / maxScores.stress) * 10),
    focus: Math.round((rawCategoryScores.focus / maxScores.focus) * 10),
    positivity: Math.round((rawCategoryScores.positivity / maxScores.positivity) * 10),
  };
  

  return {
    totalScore: total,
    categoryScores,
    suggestions: generateSuggestions(categoryScores),
  };
};


// Helper: Generate basic suggestions
const generateSuggestions = (scores) => {
  const suggestions = [];

  if (scores.stress > 10) suggestions.push('Try meditation or breathing exercises.');
  if (scores.focus < 5) suggestions.push('Use a Pomodoro timer to stay on task.');
  if (scores.positivity < 5) suggestions.push('Consider a gratitude journal.');

  return suggestions;
};

// Controller: Submit Assessment
export const submitAssessment = async (req, res) => {
  const { userId, answers } = req.body;

  if (!userId || !answers) {
    return res.status(400).json({ message: 'Missing userId or answers.' });
  }

  const scores = calculateScores(answers);

  try {
    // Get Gemini-generated analysis
    const suggestionObject = await analyzeAssessment(scores.categoryScores);

    const newAssessment = new Assessment({
      userId,
      answers,
      totalScore: scores.totalScore,
      categoryScores: scores.categoryScores,
      suggestions: [suggestionObject], // ✅ Gemini returns 1 object, schema expects array
    });

    await newAssessment.save();

    res.status(201).json({
      message: 'Assessment submitted!',
      assessment: newAssessment,
      aiAnalysis: suggestionObject,
    });
  } catch (err) {
    console.error('Error in submitAssessment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const getLatestAssessment = async (req, res) => {
  const { userId } = req.params;

  try {
    const latest = await Assessment.findOne({ userId }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: 'No assessment found' });
    }

    res.json(latest);
  } catch (err) {
    console.error('Error fetching latest assessment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
