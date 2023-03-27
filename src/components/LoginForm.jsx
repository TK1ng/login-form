import axios from 'axios';
import { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [register, setRegister] = useState(false);
    

    const emailInputChange = (e) => {
        setEmailInput(e.target.value);
    };
    const passwordInputChange = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleClick = () => {
        setRegister(() => !register);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const body = {
            username: emailInput,
            password: passwordInput
        }

        axios.post('https://auth.techjedi.dev/signin', body)
        .then(res => { console.log(res.data)})
        .catch(err => console.log(err))

    };

    return ( 
        <div className='formContainer'>
            <form onSubmit={handleLogin} className='form'>
                { register && <label>
                    <p>Name</p>
                    <input type='text' onChange={nameInputChange}/>
                </label>}
                <label>
                    <p>Email</p>
                    <input type='text' onChange={emailInputChange}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={passwordInputChange} />
                </label>
                <button type='submit'>Submit</button>
            </form>
            {register ? (
                <div>
                    <p>Already have an account?</p>
                    <button onClick={handleClick} >Sign In</button>

                </div>) : (
                <div>
                    <p>New User?</p>
                    <button onClick={handleClick}>Sign Up</button>
                </div>)}
        </div>
     );
}
 
export default LoginForm;