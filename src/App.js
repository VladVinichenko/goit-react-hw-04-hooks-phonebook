import Section from "./components/Section/Section";
import React, { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import s from './App.module.css'


function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')


  const onAddContact = (evt) => {
    evt.preventDefault()
    setContacts([...contacts, { name: name, number: number, id: nanoid() }])
  }

  const onDeleteContact = (removeId) => {
    setContacts(contacts.filter(el => el.id !== removeId))
    filterInput && setFilter(contacts.filter(el => el.id !== removeId))
    onFilterChange()
  }

  const onInput = (evt) => {
    evt.target.name === "name" && setName(evt.target.value)
    evt.target.name === "number" && setNumber(evt.target.value)
  }

  const onFilterChange = () => {
    if (filterInput.trim().length > 0) {
      setFilter(contacts.filter(el => el.name.toLowerCase().includes(filterInput.toLowerCase())))
      return
    }
    setFilter('')
  }


  const onInputFilter = (evt) => {
    setFilterInput(evt.target.value)
    onFilterChange()
  }

  useEffect(() => {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'))
    contactsLocal && setContacts(contactsLocal)
  }, [])

  useEffect(() => {

    contacts !== contacts && localStorage.setItem('contacts', JSON.stringify(contacts));

  }, [contacts])

  return (
    <Fragment>
      <Section>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onAddContact={onAddContact} onInputName={onInput} onInputTel={onInput} />
        <h2 className={s.title}>Contacts</h2>
        <Filter onInputFilter={onInputFilter} />
        <ContactList renderList={filterInput.length > 0 ? filter : contacts} onDeleteContact={onDeleteContact} />
      </Section>
    </Fragment>
  )

}


// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//     name: '',
//     number: '',
//     filterInput: ''
//   }



//   onAddContact = (evt) => {
//     evt.preventDefault()
//     if (this.state.name.trim().length > 0) {
//       this.setState(prevState => {
//         const contacts = [...prevState.contacts, { name: this.state.name, number: this.state.number, id: nanoid() }]
//         return { contacts: contacts }
//       })
//     }
//   }

//   onDeleteContact = (removeId) => {
//     this.setState({ contacts: this.state.contacts.filter(el => el.id !== removeId) })
//     this.state.filterInput && this.setState({ filter: this.state.contacts.filter(el => el.id !== removeId) })
//     this.onFilterChange()
//   }

//   onInput = (evt) => {
//     const data = {}
//     data[evt.target.name] = evt.target.value
//     this.setState(data)
//   }

//   onFilterChange = () => {
//     this.setState(prevState => {
//       if (prevState.filterInput.trim().length > 0) {
//         return { filter: prevState.contacts.filter(el => el.name.toLowerCase().includes(prevState.filterInput.toLowerCase())) }
//       }
//       return { filter: '' }
//     })
//   }

//   onInputFilter = (evt) => {
//     this.setState({ filterInput: evt.target.value })
//     this.onFilterChange()
//   }

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'))
//     contacts && this.setState({ contacts: contacts })
//   }

//   componentDidUpdate(prevProps, prevState) {
//     this.state.contacts !== prevProps.contacts && localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }

//   render() {
//     const renderList = this.state.filterInput.length > 0 ? this.state.filter : this.state.contacts
//     return (
//       <Fragment>
//         <Section>
//           <h1 className={s.title}>Phonebook</h1>
//           <ContactForm onAddContact={this.onAddContact} onInputName={this.onInput} onInputTel={this.onInput} />
//           <h2 className={s.title}>Contacts</h2>
//           <Filter onInputFilter={this.onInputFilter} />
//           <ContactList renderList={renderList} onDeleteContact={this.onDeleteContact} />
//         </Section>
//       </Fragment>
//     )
//   }
// }


export default App