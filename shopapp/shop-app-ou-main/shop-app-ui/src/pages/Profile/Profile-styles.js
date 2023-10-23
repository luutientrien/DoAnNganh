import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	Profile: {
		'& .container-profile': {
			margin: 'auto',
			padding: '20px',
			width: 'fit-content',
		},
		'& .info-user': {
			border: '1px solid',
			borderRadius: '25px',
		},
		'& .title-profile': {
			padding: '0 0 20px 0',
		},
		'& .row-title-order': {
			display: 'flex',
			justifyContent: 'space-between',
			'& .box-export-tool': {
				width: '110px',
				height: '37px',
				'& .MuiDataGrid-main': {
					display: 'none',
				},
				'& .MuiDataGrid-footerContainer': {
					display: 'none',
				},
			}
		},
	},
}));



