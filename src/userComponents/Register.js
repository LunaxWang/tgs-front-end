import { useRef, useState, useEffect } from "react";

import axios from '../utils/axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert} from "@mui/material";


const USER_PATTERN = /.+/;
const PWD_PATTERN = /(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[$%@#])/;
const TELE_PATTERN = /[0-9]{11}/;
const REGISTER_URL = '/register';

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [telephone, setTelephone] = useState('');
    const [validTelephone, setValidTelephone] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const theme = createTheme();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_PATTERN.test(user));
    }, [user])

    useEffect(() => {
        setValidTelephone(TELE_PATTERN.test(telephone));
        },[telephone])

    useEffect(() => {
        setValidPwd(PWD_PATTERN.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, telephone, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack

        if (!validName) {
            setErrMsg("Invalid Entry");
            return;
        }
        if (!validTelephone) {
            setErrMsg("Invalid Telephone number! ")
            return;
        }

        if (!validPwd) {
            setErrMsg("Invalid Password! Must contain:\n " +
                "a capital letter, a number, a special character, length >= 8")
            return;
        }

        if (!validMatch) {
            setErrMsg("Password doesn't match!")
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    username : user,
                    password : pwd ,
                    telephone : telephone}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response?.data);
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <ThemeProvider theme={theme}>
                    { errMsg && <Alert severity="error" aria-live="assertive" >{errMsg}</Alert>}

                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <TextField
                                            type="text"
                                            id="username"
                                            label="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                            // aria-invalid={validName ? "false" : "true"}
                                            // aria-describedby="uidnote"
                                            // onFocus={() => setUserFocus(true)}
                                            // onBlur={() => setUserFocus(false)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="telephone"
                                            label="telephone"
                                            name="telephone"
                                            autoComplete="off"
                                            onChange={(e) => setTelephone(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            // aria-invalid={validPwd ? "false" : "true"}
                                            // aria-describedby="pwdnote"
                                            // onFocus={() => setPwdFocus(true)}
                                            // onBlur={() => setPwdFocus(false)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            autoComplete="new-password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            // aria-invalid={validMatch ? "false" : "true"}
                                            // aria-describedby="confirmnote"
                                            // onFocus={() => setMatchFocus(true)}
                                            // onBlur={() => setMatchFocus(false)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>











                // <section>
                // <p ref={errRef} aria-live="assertive">{errMsg}</p>
                //     <h1>Register</h1>
                //     <form onSubmit={handleSubmit}>
                //         <label htmlFor="username">
                //             Username:
                //         </label>
                //         <input
                //             type="text"
                //             id="username"
                //             ref={userRef}
                //             autoComplete="off"
                //             onChange={(e) => setUser(e.target.value)}
                //             value={user}
                //             required
                //             aria-invalid={validName ? "false" : "true"}
                //             aria-describedby="uidnote"
                //             onFocus={() => setUserFocus(true)}
                //             onBlur={() => setUserFocus(false)}
                //         />
                //         {/*<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>*/}
                //         {/*    4 to 24 characters.<br />*/}
                //         {/*    Must begin with a letter.<br />*/}
                //         {/*    Letters, numbers, underscores, hyphens allowed.*/}
                //         {/*</p>*/}
                //
                //         <label htmlFor="password">
                //             Password:
                //         </label>
                //         <input
                //             type="password"
                //             id="password"
                //             onChange={(e) => setPwd(e.target.value)}
                //             value={pwd}
                //             required
                //             aria-invalid={validPwd ? "false" : "true"}
                //             aria-describedby="pwdnote"
                //             onFocus={() => setPwdFocus(true)}
                //             onBlur={() => setPwdFocus(false)}
                //         />
                //         {/*<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>*/}
                //         {/*    8 to 24 characters.<br />*/}
                //         {/*    Must include uppercase and lowercase letters, a number and a special character.<br />*/}
                //         {/*    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>*/}
                //         {/*</p>*/}
                //
                //
                //         <label htmlFor="confirm_pwd">
                //             Confirm Password:
                //         </label>
                //         <input
                //             type="password"
                //             id="confirm_pwd"
                //             onChange={(e) => setMatchPwd(e.target.value)}
                //             value={matchPwd}
                //             required
                //             aria-invalid={validMatch ? "false" : "true"}
                //             aria-describedby="confirmnote"
                //             onFocus={() => setMatchFocus(true)}
                //             onBlur={() => setMatchFocus(false)}
                //         />
                //         {/*<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>*/}
                //         {/*    Must match the first password input field.*/}
                //         {/*</p>*/}
                //
                //         <button >Sign Up</button>
                //         {/*<button disabled={!validName || !validPwd || !validMatch}>Sign Up</button>*/}
                //     </form>
                //     <p>
                //         Already registered?<br />
                //         <span className="line">
                //             <a href="/login">Sign In</a>
                //         </span>
                //     </p>
                // </section>
            )}
        </>
    )
}

export default Register;