const settings = {
    host: 'weather-ml.database.windows.net',
    database: 'weather',
    user: 'rootuser',
    password: 'overdrive1!'
};
const connection = require('node-querybuilder').QueryBuilder(settings, 'sql', 'single');
module.exports = connection;
