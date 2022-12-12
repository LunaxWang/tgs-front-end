import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert} from "@mui/material";

const LOGIN_URL = '/login';

function Login(){

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const theme = createTheme();

    useEffect(() => {
        setValidUser(user.length !== 0);
    }, [user])

    useEffect(() => {
        setValidPwd(pwd.length !== 0);
    }, [pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                username : user,
                password : pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
            });
        setUser('');
        setPwd('');
        setErrMsg('');
        setSuccess(response?.data["login-result"]);
        if (!success) {
            setErrMsg("Wrong username or password!");
        }

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
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="username"
                                    name="username"
                                    autoComplete="off"
                                    autoFocus
                                    type="text"
                                    id="username"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}

                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!validUser || !validPwd }
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            )}
        </div>
    );
}

export default Login;