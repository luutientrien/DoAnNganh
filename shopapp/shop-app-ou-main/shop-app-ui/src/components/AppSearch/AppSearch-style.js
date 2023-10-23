import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	AppSearch: {
		display: 'flex',
		margin: '20px 0',
		justifyContent: 'space-between',
		'& .row-search': {
			display: 'flex',
		},
		'& .row-search .form-input .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl': {
			height: '45px',
		},
		'& .btn-search': {
			height: '45px',
			width: '90px',
			padding: 0,
			color: '#FFF',
			backgroundColor: '#0081ff'
		}
	}
}));



