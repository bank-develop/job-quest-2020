import React from 'react'
import { Card,CardContent, CardActions, Button ,Chip,Typography} from '@mui/material'
import { makeStyles,withStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
      marginBottom:20
    },
    cardContent:{ 
      padding: 3
    },
    cardActions:{
      padding:16
    }
  })
  const Category = withStyles({
    root:{
      marginTop:10,marginBottom:10}
  })(Chip)
  
export default function JokeCard({joke,likeJoke,unlikeJoke,index}){
    const classes = useStyles()
    return(
        <div>
        <Card className={classes.card} id={`joke-${index}`}>
            <CardContent className={classes.cardContent}>
              {joke.categories.length >0 ?(
                joke.categories.map((cat)=>(
              <Category label={cat} key={cat} variant='outlined' />
              ))
              ):<Category label="regular" />}
              <Typography>
                {joke.joke}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' color="primary" onClick={()=> likeJoke(joke.id)}>
              Like
              </Button>
              <Button variant='outlined' onClick={()=> unlikeJoke(joke.id)}>
              Unlike
              </Button>
            </CardActions>
          </Card>
        </div>
    )
}