import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchField, setSearchField] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    let isAlreadyInPhonebook = false
    persons.forEach(person => { if(JSON.stringify(person) === JSON.stringify({name: newName})) {isAlreadyInPhonebook=true}})
    isAlreadyInPhonebook? alert(`${newName} is already added to phone book`): setPersons(persons.concat({name: newName, number: newNumber}))
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
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      
      setPersons(response.data)
    })
  }


  useEffect(hook,[])


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearchField={newSearchField} handleSearchFieldChange={handleSearchFieldChange}/>

      <h3>Add a new</h3>

      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearchField={newSearchField}/>
    </div>
  )
}

export default App

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
    <ul>{personsToShow.map((person, i) => <li key={i}> {person.name} {person.number} </li>)}</ul>
  )


}
 