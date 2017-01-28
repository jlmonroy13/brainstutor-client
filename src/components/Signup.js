import React from 'react';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			passwordConfirmation: '',
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitForm(e) {
		e.preventDefault();
		console.log(this.state);
	}

	render() {
		return (
			<form onSubmit={this.onSubmitForm}>
				<h1>Registrate a nuestra plataforma</h1>
				<div>
					<label>Correo Electrónico</label><br />
					<input
						value={this.state.email}
						onChange={this.onChangeForm}
						type="email"
						name="email"
					/>
				</div>
				<div>
					<label>Contraseña</label><br />
					<input
						value={this.state.password}
						onChange={this.onChangeForm}
						type="password"
						name="password"
					/>
				</div>
				<div>
					<label>Confirmar Contraseña</label><br />
					<input
						value={this.state.passwordConfirmation}
						onChange={this.onChangeForm}
						type="password"
						name="passwordConfirmation"
					/>
				</div><br />
				<button>Registrarse</button>
			</form>
		);
	}
}


export default Signup;