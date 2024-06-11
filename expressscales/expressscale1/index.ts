import express from 'express';

const app = express();
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const users = [
    {
        id: 1, 
        email: "cat@cat.com",
        password: "cat"
    },
    {
        id: 2, 
        email: "dog@dog.com",
        password: "dog"
    }
]

app.get('/login', (req, res) => {
    if (req.cookies.authToken === 'VALID_AUTH_TOKEN') {
        return res.redirect('/dashboard')
    } 
    return res.sendFile(__dirname + '/login.html')
})

app.post('/login', (req, res) => {
    const user = users.find(user => user.email == req.body.email)

    if (req.body.password === user?.password ) {
        res.cookie('authToken', 'VALID_AUTH_TOKEN', {maxAge: 90000, httpOnly: true})
        return res.redirect('/dashboard')
    } 
    else {
        return res.send('Incorrect password')
    }
})

app.get('/dashboard', (req, res) => {
    if (req.cookies.authToken === 'VALID_AUTH_TOKEN') {
        return res.sendFile(__dirname + '/dashboard.html')
    } else{
    return res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    return res.redirect('/login')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000, http://localhost:3000');
});
