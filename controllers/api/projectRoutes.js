const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newProject = await Project.create({
      ...body,
      userId: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => { 
  const projectId = req.params.id;
  const { commentText } = req.body;
  try {
    const project = await Project.findbyPk(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Append the new comment to the existing comments (if any)
    project.comments = project.comments
      ? `${project.comments}\n${commentText}`
      : commentText;

    // Save the updated project to the database
    await project.save();
    
  res.status(200).json(updatedProject);
  }catch (err) {
  res.status(400).json(err);
  }
 });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;