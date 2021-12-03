import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/compat/app';
import db from '../utils';
import history from '../history';
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from '../Auth';

export default function Login(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {auth, onLogin} = useContext(AuthContext);

    // useEffect(() => {
    //     if(window.localStorage.getItem('authenticated') === true){
    //         console.log('Login')
    //         setAuthenticated(true);
    //     }
    // },[])

    const onLoginClick = async() => {
        // db.collection('passwords').doc('masterKey').get().then((doc) => {
        //     if (username === doc.get('username') && password === doc.get('password')) {
        //         props.onLoginClick();
        //     } else {
        //         console.log('wrong credentials')
        //     }
        // })
        const q = query(collection(db, "passwords"), where("id", "==", "masterKey"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            onLogin();
                // if (username === doc.get('username') && password === doc.get('password')) {
                    // props.onLoginClick();
                // } else {
                //     console.log('wrong credentials')
                // }
          });
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Login</h1>
                    <TextField label="username" id="input-usename" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <TextField label="password" id="input-password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <Button variant="contained" color="primary" onClick={onLoginClick}>
                        {
                            auth ? <Link to='/myPasswords'>Login</Link> : "Login"
                        }
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}