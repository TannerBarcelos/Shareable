const mongoose = require('mongoose');
const config = require('config');

// get the mongoose connextion URI from our default.json file
const db = config.get('mongoURI');

// connect to mongoDB with mongoose
const connectDB = async () => {
  // throw connection in try/catch [common for async/await to be like .catch() .then() in promises]
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected')
  } catch (err) {
    // kill the app on failure of connection 
    console.error(err.message);
    process.exit(1);
  }
}

// use module.exports to export this as a whole module [we would use export default or export, etc. ins es6 and such on the frontend]
module.exports = connectDB;