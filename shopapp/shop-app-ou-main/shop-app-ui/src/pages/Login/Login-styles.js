import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	Login: {
		'& .box-login': {
			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '500px',
			padding: '40px',
			border: '1px solid',
			borderRadius: '25px',
		},
		'& .title-login': {
			textAlign: 'center',
			padding: '20px',
		}
	},
}));