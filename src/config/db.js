const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(() => {
      console.log('============== Mongodb Database Connected Successfully ==============')
    })
  } catch (err) {
    console.log('============== Database Not Connected ==============')
  }
}

module.exports = connectDB