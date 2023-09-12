import './CSS/App.css';
import {Route, Routes} from 'react-router-dom';
import CalendarPage from "./Pages/Calender-Page";
import RegisterPage from "./Pages/Register-Page";
import HomePage from "./Pages/Home-Page";
import AccountForm from './Pages/Account-Page';

// holds routes for each page with the related element
function App() {
    return (
            <div>
                <Routes>
                     <Route path={"/"} element={<HomePage/>}></Route>
                     <Route path={"/register"} element={<RegisterPage/>}></Route>
                     <Route path={"/calender"} element={<CalendarPage/>}></Route>
                     <Route path={"/account"} element={<AccountForm/>}></Route>
                </Routes>
            </div>
    );
}

export default App;
