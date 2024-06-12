import { useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


const buttonClick = async () => {
  const token = await auth.currentUser.getIdToken()
  const realToken = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // ThE CORRECT WAY TO FORMAT AN AUTH REQUEST IS (BEARER TOKEN)
  return fetch('localhost:4000/user', realToken)

}

const sendToFirebase = ({name, email, })

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async (email, password) => {
    const returnValue = await createUserWithEmailAndPassword(auth, email, password)
    console.log("returnvalue: ", returnValue)
  }
  useEffect(() => {
    // below is because you can't make useEffect async directly 
    const nestedAsyncFunction = async () => {
    const getResult2 = await buttonClick()
    console.log(getResult2)
    }
    nestedAsyncFunction()
  }, [])
  //not gonnahve a return value we care about, its a function that takes a function 

  return (
    <div> 
      <h1> Your Blog </h1>
      <h2> Dashboard </h2>
      <h2> Create a post </h2>
      <h2> See all posts </h2> 
      <input type="name" name="email" onChange={(event) => {setEmail(event.target.value)}}/> 
      <input type="name" name="password" onChange={(event) => {setPassword(event.target.value)}}/> 
      <button onClick={() => signUp(email, password)}> Submit </button>


    </div>
  )
}

export default App
