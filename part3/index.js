const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

var morgan = require('morgan')
var cors = require('cors')


app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':post_extention'))
app.use(cors())
app.use(express.static('build'))

morgan.token('post_extention',
  function (req)
  { return JSON.stringify(req.body) })


app.get('/', (request, response) => {
  response.send('<h1>Sup Peeps</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  let date_ob = new Date()
  Person
    .find({})
    .then(persons => {
      response.send(`<p> This page has info for ${persons.length} people</p>
      <p> ${date_ob.toString()}  </p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({ name: body.name, number: body.number })
  person
    .save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const updatedPerson = { name: body.name, number: body.number }
  Person
    .findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(newPerson => response.json(newPerson))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

