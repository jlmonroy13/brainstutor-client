import React, { PropTypes } from 'react';

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
	return (
		<div>
			<label>{label}</label><br />
			<input
				value={value}
				onChange={onChange}
				type={type}
				name={field}
			/>
			{error && <span>{error}</span>}
		</div>
	)
}

TextFieldGroup.propTypes = {
	field: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
	type: 'text'
}

export default TextFieldGroup;