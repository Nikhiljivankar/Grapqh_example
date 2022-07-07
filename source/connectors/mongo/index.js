const mongoose =require('mongoose');
const definations = require('./definations');


const { Schema } = mongoose;

const db = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
  process.env.MONGO_DB
}`;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connected to database");
})
.catch((e) => {
  console.log(e);
  console.log("Mongodb connection error");
});

// definations.forEach((defination) => {
//   // console.log("name",defination.name);
//   // console.log("model",defination.model);
// // mongoose.model(`${defination.name}`,defination.model)
// });


// module.exports= mongoose.model('Model', modelSchema);
module.exports= mongoose;
