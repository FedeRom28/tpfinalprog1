import React, { Component } from "react";
import '../App';

export default class Gestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documento: "",
      nombres: "",
      apellidos: "",
      fechaNac: "",
      telefono: "",
      domicilio: "",
      mail: ""
    };
  }

  render() {
    return (
      <div className="Gestion">
        <div className="Formulariopersonas">
          DNi:{" "}
          <input
            type="text"
            value={this.state.documento}
            onChange={(e) => this.setState({ documento: e.target.value })}
          />
          <br />
          Nombres:{" "}
          <input
            type="text"
            value={this.state.nombres}
            onChange={(e) => this.setState({ nombres: e.target.value })}
          />
          <br />
          Apellidos:{" "}
          <input
            type="text"
            value={this.state.apellidos}
            onChange={(e) => this.setState({ apellidos: e.target.value })}
          />
          <br />
          Nacimiento:{" "}
          <input
            type="text"
            value={this.state.fechaNac}
            onChange={(e) => this.setState({ fechaNac: e.target.value })}
          />
          <br />
          Tel:{" "}
          <input
            type="text"
            value={this.state.telefono}
            onChange={(e) => this.setState({ telefono: e.target.value })}
          />
          <br />
          Domicilio:{" "}
          <input
            type="text"
            value={this.state.domicilio}
            onChange={(e) => this.setState({ domicilio: e.target.value })}
          />
          <br />
          Mail:{" "}
          <input
            type="text"
            value={this.state.mail}
            onChange={(e) => this.setState({ mail: e.target.value })}
          />
          <br />
          <button onClick={() => this.props.enviarpersona(this.state)}>
            Enviar
          </button>
          <button id="mostrar" onClick={() => this.props.mostrarpersona(this.state)}>
            Mostrar
          </button>
        </div>
      </div>
    );
  }
}
