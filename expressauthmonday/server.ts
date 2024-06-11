import express, { type Request } from "express";
const bodyParser = require('body-parser');
import {} from "express";
const app = express()
const port = 3001
import client from './client';
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))


async function isAuthed(req: Request) {
    const userId = req.cookies.userId
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

app.get('/', (req, res) => {
  res.send('Index Page')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.post('/login', async (req, res) => {
    const emailInput = req.body.email
    const passwordInput = req.body.password
    // array of all the user data from db 
    // const dbUsers= await client.user.findMany()

    //retrieves the user from datbase with email equal to emailInput
    const dbUser = await client.user.findUnique({
        where: {
            email: emailInput
        }
    })

    if (!dbUser) return res.redirect('/signup')
        
    const isPasswordCorrect = dbUser.password === passwordInput 

    if (!isPasswordCorrect) {
        console.log(`login fail ${emailInput}`)
        return res.redirect('/login')
    } else {
    res.cookie('userId', dbUser.id, {httpOnly: true}).sendFile(__dirname + '/dashboard.html')
    }
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/signup', async (req, res) => {
    const emailSignupInput = req.body.email
    const passwordSignupInput = req.body.password

    const newUser = await client.user.create({
        data: {
            email: emailSignupInput, 
            password: passwordSignupInput
        }
    })
    res.redirect('/login')
    console.log(newUser)
})

app.get('/dashboard', async (req, res) => {
    const _isAuthed = await isAuthed(req)
    if (_isAuthed) return res.sendFile(__dirname + "/dashboard.html")
    return res.redirect('/login')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})