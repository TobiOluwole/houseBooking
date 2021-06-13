const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // mongo db connect string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        console.log('[CONNECTION] MongDB connected...');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;