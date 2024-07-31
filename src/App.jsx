import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Componentes/Header'; 
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Gestion from './Componentes/Gestion';
import Tarjetas from './Componentes/Tarjetas';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      logged: false,
      personas: [],
      showLogin: true,
      showRegister: false,
      
    };
  }

  registrodeusuario = (datos) => {
    const url = "https://personas.ctpoba.edu.ar/api/registrar";
    axios.post(url, datos)
      .then((resp) => {
        console.log(resp.data);
        alert("Se registro correctamente")
      })
      .catch((error) => {
        console.log(error);

      });
  }

  iniciarsesion = (datos) => {
    const url2 = "https://personas.ctpoba.edu.ar/api/ingresar";
    axios.post(url2, datos)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status === "ok") {
          this.setState({ token: resp.data.token, logged: true });
          
        } else {
          alert("No se pudo conectar al servidor");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  consultalistapriv = () => {
    if (this.state.token !== null) {
      const config = {
        headers: {
          authorization: this.state.token
        }
      };
      const url3 = "https://personas.ctpoba.edu.ar/api/personas";
      axios.get(url3, config)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Inicie sesión");
    }
  }

  enviarpersona = (datos) => {
    if (this.state.token !== null) {
      const config = {
        headers: {
          authorization: this.state.token
        }
      };
      const url4 = "https://personas.ctpoba.edu.ar/api/personas";
      axios.post(url4, datos, config)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("error");
    }
  }

  mostrarpersona = (datos) => {
    if (this.state.token !== null) {
      const config = {
        headers: {
          authorization: this.state.token
        },
        params: {
          busqueda: datos?.documento
        }
      };

      const url5 = "https://personas.ctpoba.edu.ar/api/personas";
      axios.get(url5, config)
        .then((resp) => {
          const COINCIDENCIA = resp.data.personas.find(persona => persona.documento === datos.documento);
          if (COINCIDENCIA) {
            this.setState({ personas: [COINCIDENCIA] });
          } else {
            this.setState({ personas: resp.data.personas });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("MAL");
    }
  }

  borrarpersona = (persona_id) => {
    if (this.state.token !== null) {
      const config = {
        headers: {
          authorization: this.state.token
        },
        params: { persona_id }
      };

      const url = "https://personas.ctpoba.edu.ar/api/personas";
      axios.delete(url, config)
        .then((resp) => {
          this.mostrarpersona({})
          console.log("se elimino correctamente");
          alert("Se elimino correctamente")
        })
        .catch((error) => {
          console.log(error + "no se pudo eliminar");
        });
    }
  }

  actualizarpersona = (datos, persona_id) => {
    if (this.state.token !== null) {
      const config = {
        headers: {
          authorization: this.state.token
        },
        params: { persona_id }
      };
      console.log({ config });

      const url = `https://personas.ctpoba.edu.ar/api/personas/`;
      axios.put(url, datos, config)
        .then((resp) => {
          console.log(resp.data);
          alert("seactualizo correctamente")
          this.mostrarpersona({})
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Inicie sesión");
    }
  }

  handleLoginClick = () => {
    this.setState({ showLogin: true, showRegister: false });
  };

  handleRegisterClick = () => {
    this.setState({ showLogin: false, showRegister: true });
  };

  render() {
    return (
      <div className='Contenedor'>
        <Header 
          onLoginClick={this.handleLoginClick} 
          onRegisterClick={this.handleRegisterClick} 
        />
        {!this.state.logged ? (
          <>
            {this.state.showLogin && <Login iniciarsesion={(datos) => this.iniciarsesion(datos)} />}
            {this.state.showRegister && <Registro registrodeusuario={(datos) => this.registrodeusuario(datos)} />}
          </>
        ) : (
          <div>
            <Gestion enviarpersona={(datos) => this.enviarpersona(datos)}
              mostrarpersona={(datos) => this.mostrarpersona(datos)} />
          </div>
        )}

        <div className='Tarjetasapp'>
          {this.state.personas.map((per, index) =>
            <Tarjetas
              key={per._id}
              persona={per}
              borrarpersona={(persona_id) => this.borrarpersona(persona_id)}
              actualizarpersona={(datos, persona_id) => this.actualizarpersona(datos, persona_id)} // Pasar la función actualizarpersona como prop
            />
          )}
        </div>
      </div>
    );
  }
}
