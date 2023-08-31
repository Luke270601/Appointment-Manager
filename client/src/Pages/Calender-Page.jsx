import '../CSS/App.css';
import {NavBar} from "../Components/NavBar";
import Calendar from "../Components/Calender";

function CalenderPage() {
    return (
        <div className="calender-page">
                <NavBar></NavBar>
            <Calendar></Calendar>
        </div>
    );
}

export default CalenderPage;
