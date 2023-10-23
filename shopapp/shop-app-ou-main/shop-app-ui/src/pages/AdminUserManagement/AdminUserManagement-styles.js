import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	AdminUserManagement: {
		padding: '20px 30px',
		margin: 'auto',
		width: 'fit-content',
		'& .box-search': {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		},
		'& .box-table': {
			width: 'fit-content'
		},
		'& .btn-role': {
			height: '45px',
			width: '130px',
			padding: 0,
			color: '#FFF',
			backgroundColor: '#0081ff',
			marginRight: '15px'
		},
		'& .app-search': {
			flexGrow: 1
		}
	}
}));