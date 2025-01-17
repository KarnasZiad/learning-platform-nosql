// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');
const { getDb } = require('../config/db');

async function getCourse(req, res) {
  const id = req.params.id;

  try {
    const cachedCourse = await redisService.getCachedData(`course:${id}`);
    if (cachedCourse) {
      console.log('Cache hit');
      return res.json(cachedCourse);
    }

    console.log('Cache miss');
    const course = await mongoService.findOneById('courses', id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    await redisService.cacheData(`course:${id}`, course, 3600);
    res.json(course);
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).send('Error retrieving course: ' + error.message);
  }
}

async function getCourses(req, res) {
  try {
    const cachedCourses = await redisService.getCachedData(`courses`);
    if (cachedCourses) {
      console.log('Cache hit');
      return res.json(cachedCourses);
    }
    console.log('Cache miss');
    const courses = await mongoService.findAll('courses');
    await redisService.cacheData(`courses`, courses, 3600);
    res.json(courses);
  } catch (error) {
    res.status(500).send('Error retrieving courses: ' + error.message);
  }
}

async function createCourse(req, res) {
  // Logique pour créer un cours
  try {
    const course = req.body;
    const result = await mongoService.insertOne('courses', course);
    await redisService.deleteCachedData("courses");
    res.json(result);
  } catch (error) {
    res.status(500).send('Error creating course: ' + error.message);
  }
}

async function getCourseStats(req, res) {
  try {
    const cachedStats = await redisService.getCachedData(`courses:stats`);
    if (cachedStats) {
      console.log('Cache hit');
      return res.json(cachedStats);
    }
    console.log('Cache miss');
    const db = getDb();
    const collection = db.collection('courses');
    const totalCourses = await collection.countDocuments();
    const durationStats = await collection
      .aggregate([
        { $group: { _id: '$duration', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
      ])
      .toArray();

    const courseNames = await collection
      .find({}, { projection: { name: 1 } })
      .toArray();
      const coursesStats = {
        totalCourses,
        durationStats,
        courseNames: courseNames.map((course) => course.name),
      };
      // cache it
      await redisService.cacheData('courses:stats', coursesStats, 3600);
      res.status(200).json(coursesStats);
  } catch (error) {
    console.error('Failed to get course stats:', error);
    res.status(500).json({ error: 'Failed to get course stats' });
  }
}

async function updateCourse(req, res) {
  const id = req.params.id;
    const updates = req.body;
    try {
      const updatedCourse = await mongoService.updateOneById(
        `courses`,
        id,
        updates
      );
      if (!updatedCourse.matchedCount) {
        return res.status(404).send("course not found");
      }
      await redisService.deleteCachedData(`course:${id}`);
      await redisService.deleteCachedData(`courses`);
      res.json({
        message: "course updated successfully",
        updatedCourse: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).send("Error updating course: " + error.message);
    }
}


async function deleteCourse(req, res) {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).send("Invalid course ID");
    }
    const result = await mongoService.deleteOneById("courses", id);
    if (result.deletedCount === 0) {
      return res.status(404).send("course not found");
    }
    await redisService.deleteCachedData(`course:${id}`);
    res.json({ message: "course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send("Error deleting course: " + error.message);
  }
}

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  getCourseStats,
  updateCourse,
  deleteCourse,
};