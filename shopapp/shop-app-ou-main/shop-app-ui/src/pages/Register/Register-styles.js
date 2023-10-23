import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	Register: {
		padding: '20px',
		width: '1100px',
		'& .title-register': {
			textAlign: 'center',
			padding: '20px 0 45px',
		},
		'& .box-acc': {
			width: '500px',
			padding: '40px',
			border: '1px solid',
			borderRadius: '25px',
			marginRight: '65px'
		},
		'& .box-info': {
			padding: '30px 0 0',
		},
	},
}));
