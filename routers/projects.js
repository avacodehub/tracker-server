const express = require("express");
const router = express.Router();
const Project = require("../models/project");

//get All
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get One
router.get("/:customId", getProject, (req, res) => {
  res.json(res.project);
});

//create
// router.post("/", async (req, res) => {
//   const project = new Project({
//     customId: req.body.customId,
//     payment: req.body.payment,
//     totalTime: req.body.totalTime,
//     totalCost: req.body.totalCost,
//   });

//   try {
//     const newProject = await project.save();
//     res.status(201).json(newProject); //201: inserted
//   } catch (error) {
//     res.status(400).json({ message: error.message }); //400: bad data
//   }
// });

//update
// router.patch("/:customId", getProject, async (req, res) => {});

//upsert
router.patch("/", async (req, res) => {
  let project;

  try {
    project = await Project.findOne({ customId: req.body.customId });
    project.payment = req.body.payment;
    project.totalTime = req.body.totalTime;
    project.totalCost = req.body.totalCost;
  } catch (error) {
    console.error(error.message);
    project = new Project({
      customId: req.body.customId,
      payment: req.body.payment,
      totalTime: req.body.totalTime,
      totalCost: req.body.totalCost,
    });
  }

  try {
    const newProject = await project.save();
    res.status(201).json(newProject); //201: inserted
  } catch (error) {
    res.status(400).json({ message: error.message }); //400: bad data
  }
});

//delete
router.delete("/:customId", getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findOne({ customId: req.params.customId });
    if (project === null) {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.project = project;
  next();
}

module.exports = router;
