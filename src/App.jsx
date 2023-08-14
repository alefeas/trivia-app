import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./appRoutes/AppRoutes.jsx";
import { MusicButton } from "./components/musicButton/MusicButton.jsx";
import '../src/styles.scss'

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <AppRoutes/>
          <MusicButton/>
        </div>
      </BrowserRouter>
  );
}

export default App;