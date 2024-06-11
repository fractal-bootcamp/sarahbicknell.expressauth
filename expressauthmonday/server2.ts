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
    const userId = req.cookies.userId
    if (userId) {
        const user = await client.user.findUnique({
        })
        if(users.find(user => user.id === req.cookies.userId)
    }
    return false 
}

//login page 
app.get('/login', async (req, res) => {
    //check if the user is already logged , if so send to dashboard

    const isLoggedin = await isAuthed(req)
    if (isLoggedin) {
    res.redirect('/dashboard')}
})

async function login(email, password) {
    //get user from database
    //compare password
    //return user

    if (!email || !password ) return null // this is just a basic security mechanism 
    
    //
    const user = await client.user.findUnique({
        where: {
            email: submittedEmail,
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

})

// signup METHOD
app.post("/signup", async (req, res) => {
    const email = req.body.email
    const password = req.body.password 
    
    const user = await login (email, password)
    if (user) res.redirect('/dashboard')

    const newUser = await client.user.create({
        data: {
            email: email, 
            password: password
        }
    })
})

app.get('/dashboard', async (req, res) => {
    const isLoggedIn = await isAuthed(req)
})

app.listen(
    3002, 
    () => console.log("Running on port 3002")
)