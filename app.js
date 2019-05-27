const path = require('path')
const express = require('express')
const fs = require('fs')
// const user = require('./user')

const app = express()

// Defnie paths
const viewsPath = path.join(__dirname, '/templates')

// Set up hbs and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/signin', (req, res) => {
    res.render('signin')
})

app.get('/attemptSignIn', (req, res) => {
    // login credentials
    const login = req.query.login
    const pw = req.query.pw
    
    // load db and see if user exists
    const dataBuffer = fs.readFileSync("db.json")
    const dataJSON = dataBuffer.toString()
    const users = JSON.parse(dataJSON)
    let currentUser = {}
    let success = false
    users.forEach((user) => {
        console.log(user.login, user.pw)
        if (user.login === login && user.pw === pw) {
            success = true
            currentUser = user
        }
    })
    if(success === false) {
        console.log("Failed login")
    }
    else {
        res.render('success', currentUser)
    }
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/resetPassword', (req, res) => {
    const oldPW = req.query.oldPW
    const newPW = req.query.newPW
    const userName = req.query.userName

    // load db and see if user exists
    const dataBuffer = fs.readFileSync("db.json")
    const dataJSON = dataBuffer.toString()
    const users = JSON.parse(dataJSON)
    let currentUser = {}
    let success = false
    users.forEach((user) => {
        console.log(user.login, user.pw)
        if (user.login === userName && user.pw === oldPW) {
            success = true
            currentUser = user
            user.pw = newPW

            // save users
            fs.writeFileSync('db.json', JSON.stringify(users))
        }
    })
    if(success === false) {
        console.log("Failed password reset")
        res.render('home')
    }
    else {
        res.render('success', currentUser)
    }
})

app.get('/addUser', (req, res) => {
    // create a new user object
    const newName = req.query.name
    const newlogin = req.query.login
    const newPW = req.query.pw
    const newUser = {login: newlogin, name: newName, pw: newPW}
    
    // load users
    const dataBuffer = fs.readFileSync("db.json")
    const dataJSON = dataBuffer.toString()
    let currUsers = JSON.parse(dataJSON)
    console.log(currUsers)
    // add new user
    currUsers.push(newUser)

    // save users
    fs.writeFileSync('db.json', JSON.stringify(currUsers))
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})