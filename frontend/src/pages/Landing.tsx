import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleClick= () =>{
        login();
        navigate("/")
    }
  return (
    <div>
      <button onClick={handleClick} >Hop into your app</button>
    </div>
  )
}

export default Landing
