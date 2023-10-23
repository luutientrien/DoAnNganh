import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    Home: {
        width: '100%',
        padding: '20px',
        '& .box-title': {
            backgroundColor: '#d9e0e6',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
        },
        '& .box-cart-list': {
            display: 'flex',
            flexFlow: 'wrap',
            width: '1155px',
            maxWidth: '1155px',
            minWidth: '1155px',
            margin: 'auto',
            '& .box-cart-padding': {
                padding: '20px'
            },
            '& .box-cart-item': {
                padding: '15px',
                width: '345px',
                backgroundColor: '#d9f6fa',
            }
        }
    },
}));