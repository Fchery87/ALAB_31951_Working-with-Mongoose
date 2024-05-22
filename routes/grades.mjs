// routes/grades.js
import express from 'express';
import mongoose from 'mongoose';
import Grade from '../models/Grade.js';

const router = express.Router();

// Get all grade entries
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find({});
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a single grade entry
router.post('/', async (req, res) => {
  try {
    const newGrade = new Grade(req.body);
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single grade entry
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).send('Not found');
    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a score to a grade entry
router.patch('/:id/add', async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body.score } },
      { new: true }
    );
    if (!grade) return res.status(404).send('Not found');
    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a score from a grade entry
router.patch('/:id/remove', async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body.score } },
      { new: true }
    );
    if (!grade) return res.status(404).send('Not found');
    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a single grade entry
router.delete('/:id', async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) return res.status(404).send('Not found');
    res.status(200).json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a learner's grade data
router.get('/learner/:id', async (req, res) => {
  try {
    const grades = await Grade.find({ learner_id: req.params.id });
    if (grades.length === 0) return res.status(404).send('Not found');
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a learner's grade data
router.delete('/learner/:id', async (req, res) => {
  try {
    const result = await Grade.deleteMany({ learner_id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send('Not found');
    res.status(200).json({ message: 'Grades deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a class's grade data
router.get('/class/:id', async (req, res) => {
  try {
    const grades = await Grade.find({ class_id: req.params.id });
    if (grades.length === 0) return res.status(404).send('Not found');
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a class id
router.patch('/class/:id', async (req, res) => {
  try {
    const result = await Grade.updateMany(
      { class_id: req.params.id },
      { $set: { class_id: req.body.class_id } }
    );
    if (result.matchedCount === 0) return res.status(404).send('Not found');
    res.status(200).json({ message: 'Class ID updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a class
router.delete('/class/:id', async (req, res) => {
  try {
    const result = await Grade.deleteMany({ class_id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send('Not found');
    res.status(200).json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
