import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import db from '../utils';
import { collection, getDocs, addDoc, doc } from "firebase/firestore"; 
import { AuthContext } from '../Auth';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 5,
    },
  });

export default function CreatePassword() {
    const {auth} = useContext(AuthContext);
    const classes = useStyles();
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emptyInputAlert, setEmptyInputAlert] = useState(null);
    const [shortPasswordAlert, setShortPasswordAlert] = useState(null);
    const [alphaNumericAlert, setAlphaNumericAlert] = useState(null);
    const [commonPasswordAlert, setCommonPasswordAlert] = useState(null);
    const [usernameExistsAlert, setUsernameExistsAlert] = useState(null);

    useEffect(() => {
        if(!inputIsEmpty() && !passwordIsTooShort() && isAlphaNumeric() && !isCommonPassword()){
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    },[website,username,password, btnDisabled])

    const inputIsEmpty = () => {
        if(website === '' || username === '' || password === '') {
            setEmptyInputAlert(<Alert severity="error">Inputs cannot be empty</Alert>)
            return true;
        }
        setEmptyInputAlert(null)
        return false;
    }

    const passwordIsTooShort = () => {
        if(password.length < 8) {
            setShortPasswordAlert(<Alert severity="error">Password must be at least 8 characters</Alert>)
            return true;
        }
        setShortPasswordAlert(null);
        return false;
    }

    const isAlphaNumeric = () => {
        const regAlpha = /[a-zA-Z]/g;
        const regNum = /\d/g;
        if(regAlpha.test(password) && regNum.test(password)) {
            setAlphaNumericAlert(null)
            return true;
        }
        setAlphaNumericAlert(<Alert severity="error">Password must include numbers and letters</Alert>)
        return false;
    }

    const isCommonPassword = () => {
        if(password === 'qwerty123' || password === 'aa12345678' || password === 'password1' ||
        password === 'password123' || password === '1q2w3e4r5t' || password === '1q2w3e4r' || 
        password === '1qaz2wsx' || password === '1234qwer' || password === 'myspace1' || password === '123456789a'){
            setCommonPasswordAlert(<Alert severity="error">Cannot be a common password</Alert>)
            return true;
        }
        setCommonPasswordAlert(null)
        return false;
    }

    //there's an issue here
    const usernameExists = () => {
        db.collection('passwords').where('username', '==', username).get().then(querySnapshot => {
            if(!querySnapshot.empty) {
                setUsernameExistsAlert(<Alert severity="error">This username already exists</Alert>)
                return true;
            }
            setUsernameExistsAlert(null);
            return false;
        })
    }

    const onSaveClick = async() => {
        try {
            // Add a new document in collection "passwords"
            await addDoc(collection(db, "passwords"), {
                website,
                username,
                password,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return(
        <div>
            {
                auth && (
                    <Grid className={classes.root} container spacing={2}>
                        <Grid item xs={12}>
                            {emptyInputAlert}
                            {shortPasswordAlert}
                            {alphaNumericAlert}
                            {commonPasswordAlert}
                            {usernameExistsAlert}
                            <h1>Create Password</h1>
                            <TextField className={classes.pos} label="website" id="input-website" variant="outlined" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                            <br/>
                            <TextField className={classes.pos} label="username" id="input-usename" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <br/>
                            <TextField className={classes.pos} label="password" id="input-password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <br/>
                            <Button disabled={btnDisabled} variant="contained" color="primary" onClick={onSaveClick}>
                                <Link to='/myPasswords'>Save</Link>
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
}