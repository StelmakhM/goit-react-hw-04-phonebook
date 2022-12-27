import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const normalizeValue = value => value.toLowerCase().trim();

  const searchContact = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addNewContact = newContact => {
    const exist = contacts.some(
      contact =>
        normalizeValue(contact.name) === normalizeValue(newContact.name)
    );
    if (exist) {
      alert('Already in list');
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      normalizeValue(contact.name).includes(normalizeValue(filter))
    );
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const filteredContacts = filterContacts();
  return (
    <div className={styles.container}>
      <ContactForm onSubmit={addNewContact} />
      <Filter searchContact={searchContact} filterValue={filter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}
