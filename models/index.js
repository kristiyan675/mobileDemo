const mongoose = require('mongoose');
const Car = require('./Car')
require('./Accessory')

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connection success')

}
    catch (e) {
        console.log('Connection Failed')
        process.exit(1)
    }
}

module.exports = init
