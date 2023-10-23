import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			// backgroundColor: theme.palette.action.hover,
		},
		width: 'fit-content'
		// '& .MuiTableCell-root': {
		//     padding: 0,
		//     height: '32px'
		// },
	},
	AppTable: {
		display: 'flex',
		flexDirection: 'column',
		'& thead ': {
			// marginBottom: '-1px'
		},
		'& thead > tr': {
			display: 'flex',
			justifyContent: 'flex-start',
		},
		'& thead > tr > th': {
			display: 'flex',
			justifyContent: 'center',
			height: '40px',
			lineHeight: '40px',
			textAlign: 'center',
			padding: 0,
			border: 'none',
			// border: '1px solid gray;'
		},
		'& tbody > tr': {
			display: 'flex',
		},
		'& tbody > tr:nth-child(even)': {
			backgroundColor: 'blue',
		},
		'& tbody > tr > td': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			height: '40px',
			lineHeight: '40px',
			padding: '0 20px 0 20px',
			border: 'none',
			// border: '1px solid gray',
			// borderLeft: 'none',
			// textAlign: 'center'
		},
	},
	AppTable1: {
		'& tbody > tr:nth-child(even)': {
			backgroundColor: '#f2f9fd',
		},
		'& thead > tr > th': {
			textAlign: 'center',
			border: '1px solid #7bc3e6',
			fontSize: '1rem',
			padding: '8px 0'
		},
		'& tbody > tr > td': {
			border: '1px solid #7bc3e6',
			padding: '8px 16px'
		},
		'& tbody > tr > td:last-child': {
			padding: 0
		},
		'& tbody > tr > td:last-child .MuiSvgIcon-root': {
			color: '#f44336',
			fontSize: '2rem'
		},
	}
}));



