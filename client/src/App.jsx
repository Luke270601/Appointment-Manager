import './CSS/App.css';
import {Route, Routes} from 'react-router-dom';
import CalendarPage from "./Pages/Calender-Page";
import HomePage from "./Pages/Home-Page";

// holds routes for each page with the related element
function App() {
    return (
            <div>
                <Routes>
                     <Route path={"/"} element={<HomePage/>}></Route>
                     <Route path={"/calendar"} element={<CalendarPage/>}></Route>
                </Routes>
            </div>
    );
}

export default App;
