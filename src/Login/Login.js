import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';
import db from '../utils';
import history from '../history';

export default function Login(props){
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     if(window.localStorage.getItem('authenticated') === true){
    //         console.log('Login')
    //         setAuthenticated(true);
    //     }
    // },[])

    const onLoginClick = () => {
        db.collection('passwords').doc('masterKey').get().then((doc) => {
            if(username === doc.get('username') && password === doc.get('password')) {
                props.onLoginClick();
                // window.localStorage.setItem('authenticated', true);
                // setAuthenticated(window.localStorage.getItem('authenticated'))
                // console.log(window.localStorage.getItem('authenticated'))
            } else {
                console.log('wrong credentials')
            }
        })
    }
    
    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Login</h1>
                <TextField label="username" id="input-usename" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <TextField label="password" id="input-password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <Button variant="contained" color="primary" onClick={onLoginClick}>
                    {
                        props.authenticated ? <Link to='/myPasswords'>Login</Link> : "Login"
                    }
                </Button>
                </Grid>
            </Grid>
        </div>
    );
}