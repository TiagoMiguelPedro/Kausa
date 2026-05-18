import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./componentes/layout/Header.jsx"
import Footer from "./componentes/layout/Footer.jsx"
import Home from "./componentes/pages/Home.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
