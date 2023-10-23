import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	AdminUserManagementDetail: {
		width: '1000px',
		'& .title-user-manager': {
			margin: '20px 0'
		},
		'& .box-order-list': {
			marginTop: '30px'
		}
	}
}));