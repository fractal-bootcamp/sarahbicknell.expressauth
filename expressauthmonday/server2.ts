import { password } from 'bun';
import express from 'express';
import { isElementAccessExpression } from 'typescript';
import client from './client';
const bodyParser = require('body-parser');
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.send("Hello world!")
})


async function isAuthed(req: Request) {
    const userId = Number(req.cookies.userId)
    console.log(req.cookies.userId)
    if (userId) {
         const user = await client.user.findUnique({
            where: {
                id: userId
            }
         })
         if (user) return true
    } 
    return false 
}

//login page 
app.get('/login', async (req, res) => {
    //check if the user is already logged , if so send to dashboard

    const isLoggedin = await isAuthed(req)
    if (isLoggedin) {
        res.redirect('/dashboard')}
    else {
        res.sendFile(__dirname + '/login.html')
    }
})

async function login(email, password) {
    //get user from database
    //compare password
    //return user

    if (!email || !password ) return null // this is just a basic security mechanism 
    
    //
    const user = await client.user.findUnique({
        where: {
            email: email,
        }
    })

    if (!user) return null

    const isPasswordCorrect = user.password === password

    if (user && isPasswordCorrect) return user 

}

//login METHOD
app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await login(email, password)
    if (!user) {
        res.redirect('/signup')
    }

    if (user) {
        res.cookie('userId', user.id, {httpOnly: true}).sendFile(__dirname + '/dashboard.html')
    }
    }
)

//signup page
app.get("/signup", async (req, res) => {
    const isLoggedin = await isAuthed(req)
    if (isLoggedin) {
    res.sendFile(__dirname + "/dashboard.html")}
    else {
        res.sendFile(__dirname + '/signup.html')
    }

})

// signup METHOD
app.post("/signup", async (req, res) => {
    const email = req.body.email
    const password = req.body.password 

    const newUser = await client.user.create({
        data: {
            email: email, 
            password: password
        }
    })
    res.redirect('/login')
})

app.get('/dashboard', async (req, res) => {
    const _isAuthed = await isAuthed(req)
    if (_isAuthed) return res.sendFile(__dirname + "/dashboard.html")
    return res.redirect('/login')
})

app.get('/logout', (req, res) => {
    res.clearCookie('userId');
    return res.redirect('/login');
})

app.listen(
    3002, 
    () => console.log("Running on port 3002")
)