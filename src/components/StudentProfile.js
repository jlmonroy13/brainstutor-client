import React, {PropTypes} from 'react';

class StudentProfile extends React.Component {
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
	id: PropTypes.number,
	email: PropTypes.string,
	role: PropTypes.string,
	created: PropTypes.string,
};

export default StudentProfile;
