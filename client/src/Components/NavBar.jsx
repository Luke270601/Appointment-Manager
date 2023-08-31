import {Link} from "react-router-dom";
import Login from "./Login";

export function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo nav-links">
                <li><Link to={"/"}>Home</Link></li>
            </div>
            <ul className={"nav-links"}>
                <li><Login></Login></li>
                <li><Link to={"/register"}>Register</Link></li>
            </ul>
        </nav>
    );
}