const mongoose = require('mongoose');
const mongo_url = String(process.env.MONGO_CONN_STRING);


mongoose.connect(mongo_url).then(() => {
    console.log('Mongodb connection successful...');
}).catch((err) => {
    console.log('Mongodb connection failed', err);
})