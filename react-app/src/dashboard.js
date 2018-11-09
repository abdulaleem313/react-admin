import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Title } from 'react-admin'; 

let uploadurl = 'https://www.favoriterun.com/api/upload';
let s3Url = 'https://favoriterun.s3.amazonaws.com/images/';
let imgUrl = s3Url + '4d089500-e41e-11e8-ac70-7d9bca0ad2e5.jpeg';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
        <Title title="Welcome to the administration" />
        <CardMedia
          className={classes.media}
          image={imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom   component="h2">
            Card example with image
          </Typography>
          <Typography component="p">
          Card example with image. Card example with image. Card example with image.
          </Typography>
        </CardContent> 
      <CardActions>
        <Button size="small" color="primary">
          Action
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);


// import React from 'react';
// import {Card, CardMedia, CardContent } from '@material-ui/core/Card'; 
// import { Title } from 'react-admin'; 

// let uploadurl = 'https://www.favoriterun.com/api/upload';
// let s3Url = 'https://favoriterun.s3.amazonaws.com/images/';
// let imgUrl = s3Url + '009ec5f0-e41d-11e8-ac70-7d9bca0ad2e5.png';
// export default () => (
//     <Card>
//         <Title title="Welcome to the administration" />
        
//         <CardMedia 
//                 image={imgUrl}
//                 title="Contemplative Reptile"
//                 />
//         <CardContent>Welcome to admin</CardContent>
//     </Card>
// );