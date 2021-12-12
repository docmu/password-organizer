import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import db from '../utils';
import { doc, deleteDoc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginRight: 5,
    },
    verticalPos: {
        marginBottom: 5,
        marginTop: 5,
    }
  });

export default function PasswordCard(props){
    const classes = useStyles();
    const [website, setWebsite] = useState(props.website);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);

    //on update button clicked: update object from database by id
    const onUpdateClick = async() => {
        await setDoc(doc(db, "passwords", props.id), {
            website,
            username,
            password,
          }, { merge: true });
        props.onUpdateCard(props.id, website, username, password)
    }

    //on delete button clicked: delete object from database by id
    const onDeleteClick = async() => {
        await deleteDoc(doc(db, "passwords", props.id));
        props.onRemoveDeletedCard(props.id)
    }

    return(
        <div>
            {
                website && username && password &&
                (
                    <Card className={classes.verticalPos}>
                        <CardContent> 
                            <Grid className={classes.root} spacing={2}>
                                <TextField className={classes.pos} label="website" id="input-website" value={website} onChange={(e) => setWebsite(e.target.value)} variant="outlined"/>
                                <TextField className={classes.pos} label="username" id="input-usename" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined"/>
                                <TextField className={classes.pos} label="password" id="input-password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined"/>  
                            </Grid>  
                            <br/>
                            <Grid className={classes.root} spacing={2}>
                                <Button className={classes.pos} variant="outlined" color="primary" size="small" onClick={onUpdateClick}>Update</Button>
                                <Button variant="outlined" color="secondary" size="small" onClick={onDeleteClick}>Delete</Button>
                            </Grid>                                   
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}