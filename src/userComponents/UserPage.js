import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "../utils/axios";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


const USER_URL = '/home';


const theme = createTheme();



export default function UserPage() {
    const [username, setUsername] = useState('');
    const [tableData, setTableData] = useState([]);
    const [inCarrier, setInCarrier] = useState('');
    const [trackingNo, setTrackingNo] = useState('');
    const [contents, setContents] = useState('');
    const [address, setAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');

    const fetchData = async (e) => {
        const response = await axios.post(USER_URL,
            JSON.stringify({
                username : username
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            });
        setTableData(response?.data);
    };

    const addPackage = async (e) => {
        e.preventDefault();
        const response = await axios.post('/addPackage',
            JSON.stringify({
                inCarrier : inCarrier,
                inTrackingId : trackingNo,
                contents : contents,
                addNPostcode : address,
                shippingMethod : shippingMethod
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            });
        // setUser('');
        // setPwd('');
        // setErrMsg('');
        // setSuccess(response?.data["login-result"]);
        // if (!success) {
        //     setErrMsg("Wrong username or password!");
        // }

    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <HomeIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        My Package
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{ py: 8 }} maxWidth="xl">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Current Stage</TableCell>
                                        <TableCell align="right">In-Carrier</TableCell>
                                        <TableCell align="right">In-Tacking-No.</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="right">Weight</TableCell>
                                        <TableCell align="right">Contents</TableCell>
                                        <TableCell align="right">Shipping Method</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Departure Time</TableCell>
                                        <TableCell align="right">Out-Tracking-No.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.id}</TableCell>
                                            <TableCell align="right">{row.currStage}</TableCell>
                                            <TableCell align="right">{row.inCarrier}</TableCell>
                                            <TableCell align="right">{row.inTrackingId}</TableCell>
                                            <TableCell align="right">{row.addNPostcode}</TableCell>
                                            <TableCell align="right">{row.weight}</TableCell>
                                            <TableCell align="right">{row.contents}</TableCell>
                                            <TableCell align="right">{row.shippingMethod}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.departureTime}</TableCell>
                                            <TableCell align="right">{row.outTrackingId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Container>
            </main>
            {/*begin form*/}
            <h5>Add a new package:</h5>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={addPackage}
                noValidate
                autoComplete="off"
            >

                <div>
                    <TextField
                        required
                        id="inCarrier"
                        onChange={(e) => setInCarrier(e.target.value)}
                        label="In-Carrier"
                        size="small"
                    />
                    <TextField
                        id="trackingNo"
                        onChange={(e) => setTrackingNo(e.target.value)}
                        label="Tracking No."
                        size="small"
                    />
                    <TextField
                        id="contents"
                        onChange={(e) => setContents(e.target.value)}
                        label="Contents"
                        size="small"
                    />
                    <TextField
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        label="Address"
                        size="small"
                    />
                    <TextField
                        id="shippingMethod"
                        onChange={(e) => setShippingMethod(e.target.value)}
                        label="Shipping Method"
                        size="small"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </div>
            </Box>
            {/*end form*/}
        </ThemeProvider>
    );
}