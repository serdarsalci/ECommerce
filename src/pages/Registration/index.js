import React from 'react';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
}));

export const Registration = () => {
	const classes = useStyles();

	return (
		<>
			<h1>Registration Page</h1>
		</>
	);
};

export default Registration;
