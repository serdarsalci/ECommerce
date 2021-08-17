import React from 'react';
import './styles.scss';

const FormInput = ({ handleChanged, label, ...otherProps }) => {
	return (
		<div className='formRow'>
			{label && <label>{label}</label>}
			<input className='formInput' onChange={handleChanged} {...otherProps} />
		</div>
	);
};

export default FormInput;
