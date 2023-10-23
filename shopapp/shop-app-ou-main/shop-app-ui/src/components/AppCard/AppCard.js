import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './AppCard.styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import image_shoope from '../../assets/images/image_shoope.jpg'
import image1 from '../../assets/images/1.jpeg'
import image2 from '../../assets/images/2.jpeg'
import image3 from '../../assets/images/3.jpeg'
import image4 from '../../assets/images/4.jpeg'
import image5 from '../../assets/images/5.jpeg'
import image6 from '../../assets/images/6.jpeg'
import image7 from '../../assets/images/7.jpeg'
import image8 from '../../assets/images/8.jpeg'
import image9 from '../../assets/images/9.jpeg'

const arrImg = [image1, image2 , image3 , image4 , image5 , image6 , image7 , image8 , image9 ]

export default function MediaCard({
	data = {},
	handleCart = () => { },


	
	handleChoose = () => { },
	className,
	idx,
}) {
	const classes = useStyles();

	return (
		<Card className={[classes.AppCard, className].join(' ')}>
			<CardActionArea onClick={() => { handleChoose(data) }}>
				<CardMedia
					className={classes.media}
					image={arrImg[idx]}
					title="Contemplative-Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2" className={classes.title}>{data.title}</Typography>
					<Typography variant="body1" color="textSecondary" component="p" className={classes.content}>{data.content}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.rowAct}>
				<Typography gutterBottom variant="h5" component="h3" className={classes.priceLabel}>{data.price} VNĐ</Typography>
				<Button size="large" color="primary" onClick={() => handleCart(data)}>
					<ShoppingCartIcon />
				</Button>
			</CardActions>
		</Card>
	);
}
