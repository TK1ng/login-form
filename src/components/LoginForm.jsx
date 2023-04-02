import axios from 'axios';
import { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [register, setRegister] = useState(false);
    

    const emailInputChange = (e) => {
        setEmailInput(e.target.value);
    };
    
    const nameInputChange = (e) => {
        setNameInput(e.target.value);
    };

    const passwordInputChange = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleClick = () => {
        setRegister(() => !register);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const body = {
            username: emailInput,
            password: passwordInput,
            name: nameInput ? nameInput : null
        }

        const endpoint = register ? 'signup' : 'signin';

        axios.post(`https://auth.techjedi.dev/${endpoint}`, body)
        .then(res => { 
            setIsSubmitting(false);
            window.location.href = res.data.data;
        })
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
                <div className="formToggle">
                    <p>Already have an account?</p>
                    <button onClick={handleClick} >Sign In</button>

                </div>) : (
                <div className="formToggle">
                    <p>New User?</p>
                    <button onClick={handleClick}>Sign Up</button>
                </div>)}
        </div>
     );
}
 
export default LoginForm;