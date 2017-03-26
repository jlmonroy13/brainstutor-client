import React, { PropTypes } from 'react';

const TextFieldGroup = ({ field, value, label, error, type, onChange, disabled }) => {
	return (
		<div>
			<label className="main-form__label">{label}</label>
			<input
				value={value}
				onChange={onChange}
				type={type}
				name={field}
				className="main-form__input"
				disabled={disabled}
			/>
			{error && <span>{error}</span>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	field: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
