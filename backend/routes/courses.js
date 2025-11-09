const express = require('express');
const Course = require('../models/Course');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add course - teacher only
router.post('/', authMiddleware, requireRole('teacher'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    const course = new Course({ title, description, teacher: req.user.id });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll student in a course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Only students should enroll (but teacher can be allowed too if desired)
    // Here we let any authenticated user enroll; if you want only students: check role
    if (course.students.includes(req.user.id)) return res.status(400).json({ message: 'Already enrolled' });

    course.students.push(req.user.id);
    await course.save();
    res.json({ message: 'Enrolled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my courses (courses where current user is enrolled) - student
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id }).populate('teacher', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
