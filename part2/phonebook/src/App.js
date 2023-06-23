import { getAllByAltText } from '@testing-library/react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import entryService from "./services/entries"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchField, setSearchField] = useState('')
  const [entryMessage, setEntryMessage] = useState(null)
  const [entryMessageFail, setEntryMessageFail] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    let isAlreadyInPhonebook = false
    let replaceEntry = false
    let id = 0
    persons.forEach(person => { 
      if(person.name === newName) {
        isAlreadyInPhonebook=true
        id = person.id
        console.log(isAlreadyInPhonebook, person.name, newName)}})
    
  if (isAlreadyInPhonebook) {
      replaceEntry = window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
    } else {
      const newEntry = {name: newName, number: newNumber}
      entryService
      .create(newEntry)
      .then(person => {
        setPersons(persons.concat(person))
        setEntryMessage(`Added ${person.name}`)
        setTimeout(() => setEntryMessage(null), 5000)
      })
    }
  
  if (replaceEntry) {
    const newEntry = {name: newName, number: newNumber}
    console.log(newEntry)
    entryService
    .replaceEntry(id, newEntry)
    .then(newEntry => {
      setPersons(persons.filter(e => e.id != id).concat(newEntry))
      setEntryMessage(`Changed ${newEntry.name}'s number`)
      setTimeout(() => setEntryMessage(null), 5000)
    })
    .catch(error => {
      console.log(error)
      setEntryMessageFail(`${newName} has already been removed from the server`)
      setTimeout(() => setEntryMessageFail(null), 5000)
    })
  }

  setNewName("")
  setNewNumber("")
}
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchFieldChange = (event) => {
    console.log(event.target.value)
    setSearchField(event.target.value)
  }

  const hook = () => {
    entryService
    .getAll()
    .then(entries => setPersons(entries))
  }


  useEffect(hook,[])

  const removeEntry = id => {
    if (window.confirm(`delete ${persons.find(e => e.id == id).name}?`)) {
      entryService
      .removeEntry(id)
      .then(() => setPersons(persons.filter(e => e.id != id)))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <EntryMessage message={entryMessage}/>
      <EntryMessageFail message={entryMessageFail}/>

      <Filter newSearchField={newSearchField} handleSearchFieldChange={handleSearchFieldChange}/>

      <h3>Add a new</h3>

      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearchField={newSearchField} removeEntry={removeEntry}/>
    </div>
  )
}

export default App

const EntryMessageFail = ({message}) => {
  if (message === null){
    return null
}

console.log(message)

return (
  <div className='entryMessageFail'>
    {message}
  </div>
)
}

const EntryMessage = ({message}) => {


  if (message === null){
      return null
  }

  console.log(message)

  return (
    <div className='entryMessage'>
      {message}
    </div>
  )
}

const Filter = (props) => {

  return (
    <div>
      filter shown with
     <input value={props.newSearchField} onChange={props.handleSearchFieldChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}


const Persons = (props) => {
  let persons = props.persons
  let newSearchField = props.newSearchField
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearchField.toLowerCase()))

  return (
    <ul>{personsToShow.map((person, i) => 
    <li key={i}> 
    {person.name} {person.number}
    <button onClick={() => props.removeEntry(person.id)}>delete</button>
    </li>)}
    </ul>
  )


}
 