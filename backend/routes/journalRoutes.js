import express from 'express';
import {
  saveOrUpdateJournal,
  getUserJournalEntries,
} from '../controllers/journalController.js';

const router = express.Router();

router.post('/', saveOrUpdateJournal);
router.get('/:userId', getUserJournalEntries);

export default router;
