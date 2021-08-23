import React, { useEffect } from 'react';
import { auth } from '../../firebase/utils';

const Logout = () => {
	useEffect(() => {
		console.log('logout useEffect');
		// const authListener = auth.onAuthStateChanged();
	}, []);

	return (
		<div>
			<h1>Logout</h1>
		</div>
	);
};

export default Logout;
