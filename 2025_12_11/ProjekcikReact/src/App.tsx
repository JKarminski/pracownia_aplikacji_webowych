import './App.css'
import {BrowserRouter, Link, Route} from "react-router"
import { Routes } from "react-router"
import Home from "./Pages/Home/Home.tsx";
import Test from "./Pages/Test/Test.tsx";
import Strona2 from "./Pages/Strona2/Strona2.tsx";

function App() {

  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/test">Test</Link>
                </li>
                <li>
                    <Link to="/Strona2">Strona2</Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/Strona2" element={<Strona2/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
