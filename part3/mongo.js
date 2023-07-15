const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]
const url = `mongodb+srv://ayshbrt210k:${password}@cluster0.791hwnd.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
    mongoose.connection.close()
  })
}
else {
  const person = Person({ name: process.argv[3], number: process.argv[4] })
  person
    .save()
    .then(() => {
      console.log(`added ${person.name} ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}


