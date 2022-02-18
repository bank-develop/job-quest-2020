import React,{useEffect,useState} from 'react'
import { makeStyles } from '@mui/styles'
import { CssBaseline, Container, Typography, Tabs, Tab, AppBar,CircularProgress, FormControlLabel, Checkbox, Badge, TextField, Button} from '@mui/material'
import JokeCard from './JokeCard'

const useStyles = makeStyles({
  form:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    margin:'1em',
  },

});

function Spinner(){
    return(
        <div style={{textAlign:'center',padding: "2rem"}}>
        <CircularProgress />
      </div>
    )
};

function App() {
const [jokes,setJokes] = useState([])
const [jokesShow,setJokesShow] = useState([])
const [likedJokes,setLikedJokes] = useState([])
const [unlikedJokes,setUnlikedJokes] = useState([])
const [currentTab,setCurrentTab] = useState(0)
 const [loading,setLoading] = useState(false)
 const [categories,setCategories] = useState([])
 const [filterCategories,setFilterCategories] = useState([])
 const [firstName, setFirstName] = useState('Chuck')
 const [lastName, setLastName] = useState('Norris')
 const classes = useStyles()


 useEffect(()=>{
      setLoading(true)
      fetchAndSetJokes()
      fetch('http://api.icndb.com/categories')
      .then((res)=>res.json())
      .then((res)=>{
        setCategories(res.value)
        setFilterCategories(res.value)
        setLoading(false)
      }).catch((err)=>console.log(err))
  },[]);
const fetchAndSetJokes=()=>{
  fetch(`http://api.icndb.com/jokes?firstName=${firstName}&lastName=${lastName}`)
  .then((res)=>res.json())
  .then((res)=>{
    setJokes(res.value)
    setJokesShow(res.value.slice(0,9))
    setLoading(false)
  }).catch((err)=>console.log(err))
}

  const likeJoke =(id)=>{
    if(likedJokes.find(j=> j.id ===id)) return
    const likedJoke = jokes.find(j => j.id ===id) 
    setLikedJokes([likedJoke,...likedJokes])
  }
  const unlikeJoke =(id)=>{
    if(unlikedJokes.find(j=> j.id ===id)) return
    const newLikedJokes = likedJokes.filter(j => j.id !== id) 
    setLikedJokes(newLikedJokes)
  }
  const changeTab =(event,value)=>{
      setCurrentTab(value)
  }
  const addMoreJokes = ()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    setJokesShow(jokes.slice(0,jokesShow.length + 9));
  }
    const observeElement =(bottomJoke)=>{
      if(!bottomJoke) return;
      const observer = new IntersectionObserver(
        (entries)=>{
        if(entries[0].isIntersecting === true){
          addMoreJokes();
          observer.unobserve(bottomJoke)
        }
      },
      {
        threshold:1
      })
      const index = jokesShow.length -1
      const bottomJokeId = `joke-${index}`
      const bottomJokeEl = document.getElementById(bottomJokeId)
      observer.observe(bottomJokeEl)
    };

    useEffect(()=>{
      const bottomJokeEl = document.getElementById(`joke-${jokesShow.length -1}`);
      observeElement(bottomJokeEl)
    },[jokesShow])
    const toggleCategory = (event, value) =>{
      const category = event.target.name
      if(filterCategories.includes(category)){
       const _filterCategories = [...filterCategories]
       const categoryIndex = _filterCategories.indexOf(category)
       _filterCategories.splice(categoryIndex,1)
       setFilterCategories(_filterCategories)
      }
      else{
        setFilterCategories([...filterCategories,category])
      }
    }
    const categoryMatch = (jokeCategories)=>{

      for(let i =0 ;i<jokeCategories.length;i++ ){
        if(filterCategories.includes(jokeCategories[i])) return true
      }
      return false
    }
    const changeName =(e) =>{
      e.preventDefault();
      if(firstName === "" || lastName ==='')return ;
      fetchAndSetJokes()
    }

  return (
    <div className="App">
      <CssBaseline/>
      <Container>
      <Typography variant="h4" align='center' style={{marginTop:60}}>
          Have Fun with Chunk Norris Jokes !!
        </Typography>
        <AppBar style={{marginBottom:20}} possiton="sticky">
        <Tabs value={currentTab} onChange ={changeTab} centered  textColor="inherit"  indicatorColor="primary">
          <Tab label="Home" id="home-tab" araia-controls="home-panel" ></Tab>
          <Tab label=
          {
          <Badge color="secondary" badgeContent={likeJoke.length >0 ? likedJokes.length : null}>Likes</Badge>} 
          id="like-tab" araia-controls="like-panel" />
      
        </Tabs>
        </AppBar>
        <div role="tabpanel" hidden={currentTab !== 0}>
<       div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <form onSubmit={changeName} noValidate className={classes.form}>
            <TextField id="first name" label="First Name" value={firstName} size="small" style={{margin:5}}
 onChange={e => setFirstName(e.target.value)}/>
            <TextField id="last name" label="Last Name" value={lastName} size="small"  style={{margin:5}}
  onChange={e => setLastName(e.target.value)} />
            <Button type="submit" variant="contained" size="medium"  style={{margin:5}}>Search</Button>
          </form>
          </div>
        {/* Category Filter */}
        {categories.map(category=>(
          <FormControlLabel 
          key={category}
          label ={category}
          control={
            <Checkbox name={category} color="primary" checked={filterCategories.includes(category)} onChange={toggleCategory}/>
          }
          />
        ))}
        {jokesShow.map((joke,index)=>{
          if(joke.categories.length === 0 || categoryMatch(joke.categories))
          {
            return (
          <JokeCard key={joke.id} joke={joke} likeJoke ={likeJoke} unlikeJoke={unlikeJoke} index={index}/>
        );
      }
          })}
        {loading && <Spinner/>}
        </div>
        <div role="tabpanel" hidden={currentTab !== 1}>
        {likedJokes.map(joke=>(
            <JokeCard key={joke.id} joke={joke} likeJoke ={likeJoke} unlikeJoke={unlikeJoke}></JokeCard>
        ))}

        </div>
      </Container>
    </div>
  );
}

export default App;
