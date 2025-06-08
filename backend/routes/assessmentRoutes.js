import express from 'express';
import {
  submitAssessment,
  getLatestAssessment,
} from '../controllers/assessmentController.js';

const router = express.Router();

// POST /api/assessments/submit  --> submit answers
router.post('/submit', submitAssessment);

// GET /api/assessments/:userId/latest  --> get latest assessment for user
router.get('/:userId/latest', getLatestAssessment);


export default router;
