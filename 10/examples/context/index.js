module.exports = (Sequelize) => {
    const sequelize = new Sequelize('postgres', 'sgpostgres', '7gJtd#PzyS20JLsC', {
        host: 'SG-tabby-ringer-5945-6129-pgsql-master.servers.mongodirector.com',
        dialect: 'postgres',
    })

    const news = require('../models/news')(Sequelize, sequelize);
    const comments = require('../models/comments')(Sequelize, sequelize);

    news.hasMany(comments, {foreignKey: 'nID'});

    return {
        news,
        comments,

        sequelize,
    }
}