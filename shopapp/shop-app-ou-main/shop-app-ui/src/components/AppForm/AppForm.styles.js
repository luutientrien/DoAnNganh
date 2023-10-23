import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	AppForm: {
		display: 'flex',
		margin: '20px 0',
		width: '100%',
		padding: '0 4px',
		justifyContent: 'space-between',
		'& .row-search': {
			display: 'flex',
		},
		'& .row-search .form-input .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl': {
			height: '45px',
		},
		'& .btn-action': {
			height: '38px',
			width: '90px',
			padding: 0,
			color: '#FFF',
		},
		'& .btn-action2': {
			height: '38px',
			padding: 0,
			color: '#FFF',
		},
		'& .btn-submit': {
			backgroundColor: '#0081ff'
		},
		'& .btn-goback': {
			backgroundColor: 'gray'
		},
	}
}));