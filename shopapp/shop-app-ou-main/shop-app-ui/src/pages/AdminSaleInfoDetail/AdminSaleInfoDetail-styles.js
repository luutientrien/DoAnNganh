import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	AdminSaleInfoDetail: {
		'& .box-title': {
			display: 'flex',
			flexDirection: 'row',
			padding: '0 0 20px 0'
		},
		'& .btn-search': {
			height: '38px',
			width: '150px',
			padding: 0,
			color: '#FFF',
			marginLeft: '50px',
			backgroundColor: '#0081ff'
		},
		'& .row-act': {
			backgroundColor: '#b0edf4 !important'
		}
	},
}));



