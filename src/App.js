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

  const onFilterChange = (filterInputValue) => {
    setFilterInput(filterInputValue)
    if (filterInputValue.trim().length > 0) {
      setFilter(contacts.filter(el => el.name.toLowerCase().includes(filterInputValue.toLowerCase())))
      return
    }
    setFilter('')
  }

  const onDeleteContact = (removeId) => {
    setContacts(contacts.filter(el => el.id !== removeId))
    filterInput.length > 0 && setFilter(filter.filter(el => el.id !== removeId))
  }

  const onInput = (evt) => {
    evt.target.name === "name" && setName(evt.target.value)
    evt.target.name === "number" && setNumber(evt.target.value)
  }

  const onInputFilter = (evt) => {
    setFilterInput(evt.target.value.trim())
    onFilterChange(evt.target.value)
  }

  useEffect(() => {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'))
    contactsLocal && setContacts(contactsLocal)
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
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


export default App