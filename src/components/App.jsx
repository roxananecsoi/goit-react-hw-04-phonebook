import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2>Contacts:</h2>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        className={styles.list}
      />
    </div>
  );
};

export default App;
