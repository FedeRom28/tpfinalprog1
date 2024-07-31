import { Component } from "react";
import '../App.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        }
    }

    render() {
        return (
            <div className="Login">
                <h2>Iniciar Sesión</h2>
                <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
                <input 
                    type="text" 
                    placeholder="Usuario"
                    value={this.state.user} 
                    onChange={(e) => this.setState({ user: e.target.value })} 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={this.state.pass} 
                    onChange={(e) => this.setState({ pass: e.target.value })} 
                />
                <button onClick={() => this.props.iniciarsesion(this.state)}>Iniciar sesión</button>
            </div>
        );
    }
}
