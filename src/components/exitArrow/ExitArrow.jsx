import { Link } from "react-router-dom"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export const ExitArrow = () => {
    return (
        <Link to='/'><KeyboardBackspaceIcon className="exitIcon"/></Link>
    )
}
