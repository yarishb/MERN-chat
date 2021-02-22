const mongoose = require('mongoose');

function mongooseConnection () {
    mongoose.Promise = global.Promise;
     mongoose.connect(process.env.MONGODB_URI,{
         useFindAndModify: false,
         useNewUrlParser: true,
         useUnifiedTopology:true,
         useCreateIndex: true
     }).then(
      () => {console.log('Database is connected')},
      err => { console.log('Can not connect to the database'+ err)}
    );
}


module.exports = mongooseConnection