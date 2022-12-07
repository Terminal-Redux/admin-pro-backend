const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    } catch(e) {
        console.error(e);
        throw new Error('Error a la hora de conectarse a la base de datos!')
    }
}

module.exports = {
    dbConnection
}