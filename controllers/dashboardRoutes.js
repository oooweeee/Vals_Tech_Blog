const router = require('express').Router();
const { Project } = require('../models');
const withAuth = require('../utils/auths');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const projectData = await Project.findAll({
        where: { userId:req.session.user_id}
      });
  
      // Serialize data so the template can read it
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('profile', { 
        projects, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;