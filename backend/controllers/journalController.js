import JournalEntry from "../models/journalEntry.js";

// Save or Update a journal entry
export const saveOrUpdateJournal = async (req, res) => {
  const { userId, pageNumber, text, voiceUrl } = req.body;

  if (!userId || !pageNumber) {
    return res.status(400).json({ message: 'userId and pageNumber are required' });
  }

  try {
    const existingEntry = await JournalEntry.findOne({ userId, pageNumber });

    if (existingEntry) {
      existingEntry.text = text || existingEntry.text;
      existingEntry.voiceUrl = voiceUrl || existingEntry.voiceUrl;
      await existingEntry.save();
      return res.status(200).json({ message: 'Journal entry updated', entry: existingEntry });
    }

    const newEntry = new JournalEntry({ userId, pageNumber, text, voiceUrl });
    await newEntry.save();
    return res.status(201).json({ message: 'Journal entry saved', entry: newEntry });

  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all entries for a user
export const getUserJournalEntries = async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await JournalEntry.find({ userId }).sort({ pageNumber: 1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
