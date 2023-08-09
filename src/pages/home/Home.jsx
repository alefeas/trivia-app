import { Link } from "react-router-dom"

export const Home = () => {

    return (
        <div className="homeContainer">
            <h1 className="title">TRIVIA APP</h1>
            <div>
                <Link to='/play'>PLAY</Link>
                <Link to='/how-to-play'>HOW TO PLAY</Link>
            </div>
        </div>
    )
}
