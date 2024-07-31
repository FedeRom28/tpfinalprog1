import { Component } from "react";
import '../App.css';

export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            nombres: "",
            apellidos: "",
            documento: ""
        }
    }

    render() {
        return (
            <div className="Registro">
                <h2>Registro de Usuario</h2>
                <p>Ingresa tus credenciales para crear a tu cuenta.</p>
                <input 
                    type="text" 
                    placeholder="Ingrese su Usuario"
                    value={this.state.user} 
                    onChange={(e) => this.setState({ user: e.target.value })} 
                />
                <input 
                    type="password" 
                    placeholder="Ingrese su Contraseña"
                    value={this.state.pass} 
                    onChange={(e) => this.setState({ pass: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Ingrese su Nombre"
                    value={this.state.nombres} 
                    onChange={(e) => this.setState({ nombres: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Ingrese su Apellido"
                    value={this.state.apellidos} 
                    onChange={(e) => this.setState({ apellidos: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Ingrese su DNI"
                    value={this.state.documento} 
                    onChange={(e) => this.setState({ documento: e.target.value })} 
                />
                <button onClick={() => this.props.registrodeusuario(this.state)}>Registrarse</button>
            </div>
        );
    }
}
