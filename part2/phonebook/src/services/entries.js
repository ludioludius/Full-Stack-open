import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
return (
    axios
    .get("http://localhost:3001/persons")
    .then(response => response.data)
)
}

const create = (entry) => {
return (    
    axios
    .post("http://localhost:3001/persons", entry)
    .then(response => response.data)
)
}

const removeEntry = id => {
return (
    axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then(response => response.data)
)
}

const replaceEntry = (id, newEntry) => {
return (
    axios
    .put(`http://localhost:3001/persons/${id}`, newEntry)
    .then(response => response.data)
)
}


export default {getAll, create ,removeEntry, replaceEntry}

