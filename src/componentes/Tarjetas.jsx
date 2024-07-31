import React, { Component } from 'react';

export default class Tarjetas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      documento: props.persona.documento,
      nombres: props.persona.nombres,
      apellidos: props.persona.apellidos,
      fechaNac: props.persona.fechaNac,
      telefono: props.persona.telefono,
      domicilio: props.persona.domicilio,
      mail: props.persona.mail,
    };
  }

  componentDidMount(){
    this.setState({
      documento: this.props.persona.documento,
      nombres: this.props.persona.nombres,
      apellidos: this.props.persona.apellidos,
      fechaNac: this.props.persona.fechaNac,
      telefono: this.props.persona.telefono,
      domicilio: this.props.persona.domicilio,
      mail: this.props.persona.mail,
      
    })
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  estadoedicion = () => {
    this.setState((prevState)  => ({
      editing: !prevState.editing,
    }));
  };

  handleUpdate = () => {
    const datosactualizados = {
      documento: this.state.documento,
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      fechaNac: this.state.fechaNac,
      telefono: this.state.telefono,
      domicilio: this.state.domicilio,
      mail: this.state.mail,
    };
    this.props.actualizarpersona(datosactualizados, this.props.persona._id);
    this.estadoedicion();
  };

  render() {
    const { persona } = this.props;

    if (this.state.editing) {
      return (
        <div className="Tarjetas">
          <div>
            <input
              type="text"
              name="documento"
              value={this.state.documento}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="nombres"
              value={this.state.nombres}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="apellidos"
              value={this.state.apellidos}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="fechaNac"
              value={this.state.fechaNac}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="telefono"
              value={this.state.telefono}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="domicilio"
              value={this.state.domicilio}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="mail"
              value={this.state.mail}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleUpdate}>Guardar</button>
            <button onClick={this.estadoedicion}>Cancelar</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Tarjetas">
          <div>
            <p>DNI: {persona.documento}</p>
            <p>Nombres: {persona.nombres}</p>
            <p>Apellidos: {persona.apellidos}</p>
            <p>Fecha de Nacimiento: {persona.fechaNac}</p>
            <p>Teléfono: {persona.telefono}</p>
            <p>Domicilio: {persona.domicilio}</p>
            <p>Mail: {persona.mail}</p>
            <button onClick={() => this.props.borrarpersona(this.props.persona._id)}>Eliminar</button>
            <button onClick={this.estadoedicion}>Actualizar</button>
          </div>
        </div>
      );
    }
  }
}
