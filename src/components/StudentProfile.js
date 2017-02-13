import React, {PropTypes} from 'react';

class StudentProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	componentWillMount() {
		const { getUserInfo } = this.props;
		getUserInfo();
	}

	render() {
		const { id, email, role, created } = this.props;
		return (
			<div>
				<h1>{`Correo: ${email}`}</h1>
				<p>{`id: ${id}`}</p>
				<p>{`role: ${role}`}</p>
				<p>{`Creado: ${created}`}</p>
			</div>
		);
	}
}

StudentProfile.propTypes = {
	getUserInfo: PropTypes.func.isRequired,
	id: PropTypes.number,
	email: PropTypes.string,
	role: PropTypes.string,
	created: PropTypes.string,
};

export default StudentProfile;