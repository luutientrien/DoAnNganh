import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		// width: 'fit-content'
	},
	labelSpace: {
		width: '170px'
	},
	marginLeft: {
		marginLeft: '10px'
	},
	labelBorder: {
		padding: "15px 10px",
		borderTopLeftRadius: "5px",
		borderBottomLeftRadius: "5px",
		width: "150px",
		minWidth: "150px",
		maxWidth: "150px",
		border: "1px solid #AEAAA8",
		backgroundColor: '#ebe6e3',
		alignContent: 'center',
		display: 'flex',
		flexWrap: 'wrap',
	},
	labelRequired: {
		backgroundColor: '#b0edf4 !important'
	},
	boxInput: {
		flexGrow: 1,
		"& .MuiOutlinedInput-notchedOutline": {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		}
	},
	appDatePicker: {
		'& .MuiFormControl-marginNormal': {
			margin: 0,
			'& .MuiOutlinedInput-root': {
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
			}
		}
	}
}));