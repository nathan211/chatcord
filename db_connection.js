const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

const configMongo = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(mongo_url, configMongo)
    .then(() => console.log('Connected with Mongodb'))
    .catch((err) => console.log('Fail to connect Mongodb:', err.message));