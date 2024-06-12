import express from 'express';

const app = express()

const port = 4000

// DO NOT LOG IN WITH SERVER 

const users = [
    { name: "dorothy"},
    {name: "sarah"}, 
    {name: "lui"}
]

app.get('/user',(req, res) => {
    const userToken = req.headers.authorization.split(" ")[1]
    // this where the token lives ^ 
    console.log(userToken)
    return res.send("hi")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })