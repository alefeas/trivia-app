import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export const ExitArrow = () => {
    return (
        <div className="exitArrowContainer">
            <Link to='/'><KeyboardBackspaceIcon className="exitIcon"/></Link>
        </div>
    )
}
