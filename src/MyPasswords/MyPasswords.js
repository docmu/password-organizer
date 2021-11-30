import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import PasswordCard from '../PasswordCard/PasswordCard';
import Container from '@material-ui/core/Container';
import db from '../utils';

export default function MyPasswords(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        fetchPasswords();  
        // if(window.localStorage.getItem('authenticated') === true){
        //     console.log('myPasswords')
        //     setAuthenticated(true);
        // }
    },[])

    const onLogoutClick = () => {
        // window.localStorage.setItem('authenticated', false)
        // setAuthenticated(window.localStorage.getItem('authenticated'))
        // console.log('signed out')
        props.onLogoutClick();
    }

    const fetchPasswords= async () => {
        const response = db.collection('passwords');
        const data = await response.get();
        let arr = [...passwords];
        data.docs.forEach(item => {
            //add id as a field
            db.collection('passwords').doc(item.id).set({
                "id": item.id,
            },{merge:true})
            // console.log(item.data().id)
            if(item.data().id !== 'masterKey'){
                arr = [...arr, item.data()]
            }          
        })
        console.log(arr)
        setPasswords(arr);
    }

    const onRemoveDeletedCard = (id) => {
        const updatedArray = passwords.filter(obj => obj.id !== id);
        setPasswords(updatedArray)
        console.log('updated')
        console.log(updatedArray)
    }

    const onUpdateCard = (id, site, user, pass) => {
        passwords.map(obj => {
            if(obj.id === id){
                obj.website = site;
                obj.username = user;
                obj.password = pass; 
            }
        })
    }

    return(
        <Container maxWidth="md">
            {
                props.authenticated && (
                    <div>
                        <h1>MyPasswords</h1>
                        <Link to='/createPassword'>
                            <Button variant="contained" color="primary">Create New</Button>
                        </Link>
                        <Link to='/'>
                            <Button variant="contained" color="primary" onClick={onLogoutClick}>Logout</Button>
                        </Link>
                        {
                            passwords && passwords.map((i) => 
                                <PasswordCard key={i.id} id={i.id} website={i.website} username={i.username} password={i.password} onRemoveDeletedCard={onRemoveDeletedCard} onUpdateCard={onUpdateCard}/>
                            )
                        }
                    </div>
                )
            }
        </Container>
    )
}