import { useRef, useState, useEffect, useContext } from 'react';

import axios from '../utils/axios';

const LOGIN_URL = '/auth';

function Login(){


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                username : user,
                password : pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
            });
        console.log(JSON.stringify(response?.data));
        setUser('');
        setPwd('');
        console.log(response?.data.getData("login-result"));
        setSuccess(true);



    }

    return (
        <div>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*TODO: update link*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
}

export default Login;