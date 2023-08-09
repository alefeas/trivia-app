import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/home/Home.jsx"
import { Game } from "../pages/game/Game.jsx"
import { HowToPlay } from "../pages/howToPlay/HowToPlay.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/play' element={<Game/>}/>
            <Route path='/how-to-play' element={<HowToPlay/>}/>
        </Routes>
    )
}
