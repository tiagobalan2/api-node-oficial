const { Sequelize } = require('sequelize');


module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'xxxxx', // quando testar inserir a senha certa, fazer o mesmo no arquivo config.json
    database: 'apiNode',
    define: {
        timestamps: true,
        underscored: true
    }

}

const config = require('./config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;