import '../CSS/App.css';
import {NavBar} from "../Components/NavBar";
import {RegisterComponent} from "../Components/Register";

function Register() {
  return (
    <div className="register-page">
                <NavBar></NavBar>
                <RegisterComponent></RegisterComponent>
    </div>
  );
}

export default Register;
