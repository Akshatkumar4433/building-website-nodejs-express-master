const express = require('express');
const path = require('path');
//This a function
//this returns a object
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
//first line attachs ejs as view engine
//second line is where to find this view engine files
//or simply our template

app.use(express.static(path.join(__dirname, './static')))
//we are using middleware static
//which looks for static files in directory
//and then sends to server

const port = 3000;

app.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname, './static/index.html'))
    //__dirname is global variable from node js
    //This prints current directory

})

app.get('/speakers', (request, response) =>{
    response.sendFile(path.join(__dirname, './static/speakers.html'))
})


app.listen(port, ()=> {
  console.log(`I am listening at ${port}`)
})
