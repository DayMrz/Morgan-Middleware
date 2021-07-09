const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next()
})

app.use((req, res, next) => {
    const { password } = req.query;
    if (password === 'Dabadirabada') {
        next()
    }
    res.send('YOU NEED A PASSWORD')
})

app.use('/dogs', (req, res, next) => {
    console.log('Dogs are cute <3')
    next()
})


app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Home Page')
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Wof')
})

app.get('/secret', (req, res) => {
    res.send('Pudding has three eyes and wants to kill Sanji at the weeding')
})

app.use((req, res) => {
    res.status(404).res.send('NOT FOUND! sowwy :(')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})