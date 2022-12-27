import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { useState } from 'react';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onInputChange = event => {
    const { value, name } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error('Unexpected input error');
    }
  };

  const onFormSubmit = event => {
    event.preventDefault();
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    onSubmit(newContact);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <h1>Phonebook</h1>
        <div className={styles.formControl}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={onInputChange}
              value={name}
            />
          </label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputChange}
            value={number}
          />
          <button type="submit">Add contact</button>
        </div>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
