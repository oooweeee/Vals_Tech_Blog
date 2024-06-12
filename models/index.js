const User = require('./User');
const project = require('./Project');

User.hasMany(project,{
    foreignKey:'userId',
    onDelete: 'CASCADE'
});

project.belongsTo(User, {
    foreignKey: 'userId',
});

module.exports = { User, project };