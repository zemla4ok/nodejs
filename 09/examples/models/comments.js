module.exports = (Sequelize, sequelize) => {
    return sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: Sequelize.STRING,
        }
    })
}