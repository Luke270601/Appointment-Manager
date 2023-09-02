import React, { useState} from 'react';
import '../CSS/App.css';

export function RegisterComponent (){
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return(
        <div id='register-component'>
            <div className='register-box'>
                <form>
                    <li>Firstname:</li>
                    <input type='text'></input>
                    <li>Surname:</li>
                    <input type='text'></input>
                    <li>Email:</li>
                    <input type='text'></input>
                    <li>Confirm email:</li>
                    <input type='text'></input>
                    <li>Password:</li>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    <li>Confirm Password:</li>
                    <input type='password'></input>
                </form>
                <button>Register</button>            
            </div>
        </div>
    );
}