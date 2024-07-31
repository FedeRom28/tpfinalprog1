import '../App.css';

import React from 'react';

const Header = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><button onClick={onLoginClick}>Iniciar sesión</button></li>
          <li><button onClick={onRegisterClick}>Registrarse</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
