import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./componentes/layout/Header.jsx";
import Footer from "./componentes/layout/Footer.jsx";
import Home from "./componentes/pages/Home.jsx";
import Causas from "./componentes/pages/Causas.jsx";
import Eventos from "./componentes/pages/Eventos.jsx";
import SobreNos from "./componentes/pages/SobreNos.jsx";
import Login from "./componentes/pages/Login.jsx";
import Register from "./componentes/pages/Register.jsx";



function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/causas" element={<Causas/>}/>
                    <Route path="/eventos" element={<Eventos/>}/>
                    <Route path="/sobrenos" element={<SobreNos/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>

        </>
    )
}

export default App
