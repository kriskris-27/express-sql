import {Routes, Route} from "react-router-dom"
import Protectedroute from "./Protectedroute"
import Home from "../pages/Home"
import Applayout from "../layout/Applayout"
import Landing from "../pages/Landing"

const Approute = () => {
  return (
    <Routes>
        <Route path="/welcome" element={<Landing/>}/>
        <Route path="/" element={
            <Protectedroute>
                <Applayout/>
            </Protectedroute>}
            >
                <Route index element={<Home/>}/>
        </Route>
    </Routes>
  )
}

export default Approute
