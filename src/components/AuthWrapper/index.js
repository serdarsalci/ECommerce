import React from 'react';
import './styles.scss';

const AuthWrapper = ({ children, headline, errors }) => {
	if (errors) {
		console.log(errors);
	}
	return (
		<div className='authWrapper'>
			<div className='wrap'>
				{headline && <h2>{headline}</h2>}
				<span className='error'>
					{errors &&
						errors.length > 0 &&
						errors.map((error, index) => <div key={index}>{error}</div>)}
				</span>
				<div className='children'>{children && children} </div>
			</div>
		</div>
	);
};

export default AuthWrapper;
