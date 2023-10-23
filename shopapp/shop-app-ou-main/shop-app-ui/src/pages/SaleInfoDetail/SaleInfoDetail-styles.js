import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	SaleInfoDetail: {
		margin: 'auto',
		width: '1400px',
		'& .MuiInputBase-input.Mui-disabled': {
			color: 'black',
		},
		'& .title-sale': {
			padding: '20px 0'
		},
		'& .box-order': {
			border: '1px solid',
			padding: '40px',
			borderRadius: '25px',
			margin: '90px 20px 0',
			textAlign: 'center',
			height: 'fit-content',
			'& .box-order-input': {
				display: 'flex',
				flexDirection: 'row',
				margin: '10px',
				'& .order-label': {
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
					backgroundColor: '#b0edf4 !important',
					margin: 0
				},
				'& .order-input-number': {
					'& .MuiInputBase-input.Mui-disabled': {
						textAlign: 'center'
					},
				},
				"& .MuiOutlinedInput-notchedOutline": {
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
				}
			}
		},
		'& .btn-submit': {
			backgroundColor: '#0081ff',
			height: '38px',
			padding: 0,
			color: '#FFF',
			margin: '20px 0'
		},
	},
}));