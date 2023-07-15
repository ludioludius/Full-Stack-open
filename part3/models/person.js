const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to database...')

mongoose
  .connect(url)
  .then(() => console.log('connected to database'))
  .catch(error => {
    console.log('error connecting to database')
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  name: { type: String,
    minLength: 3,
    required: true },
  number:
    {   type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{5,}/.test(v)
        }
      } },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
