import React from 'react';

const PersonList = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
