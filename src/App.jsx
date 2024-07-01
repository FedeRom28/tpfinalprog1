import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import PersonList from './components/PersonList';

const API_URL = 'https://personas.ctpoba.edu.ar/api';

const App = () => {
  const [authData, setAuthData] = useState(null);
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      setAuthData(parsedAuthData);
      fetchPersons(parsedAuthData.token);
    }
  }, []);

  const fetchPersons = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/persons`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await axios.post(`${API_URL}/register`, { email, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      setAuthData(response.data);
      localStorage.setItem('authData', JSON.stringify(response.data));
      fetchPersons(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/persons`, { name }, {
        headers: { Authorization: `Bearer ${authData.token}` }
      });
      setPersons([...persons, response.data]);
      setName('');
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await axios.delete(`${API_URL}/persons/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` }
      });
      setPersons(persons.filter(person => person.id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleLogout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  if (!authData) {
    return (
      <div>
        <h1>Login</h1>
        <AuthForm onSubmit={handleLogin} isLogin={true} />
        <h1>Register</h1>
        <AuthForm onSubmit={handleRegister} isLogin={false} />
      </div>
    );
  }


};

export default App;
