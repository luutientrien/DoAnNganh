import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	AdminProduct: {
		width: 'fit-content',
		padding: '20px',
		margin: 'auto',
		'& .box-table': {
			width: 'fit-content'
		}
	}
}));