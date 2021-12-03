import React, {useEffect, useState, useContext} from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import PasswordCard from '../PasswordCard/PasswordCard';
import Container from '@material-ui/core/Container';
import db from '../utils';
import { AuthContext } from '../Auth';
import { collection, getDocs, doc, setDoc } from "firebase/firestore"; 

export default function MyPasswords() {
    const [passwords, setPasswords] = useState([]);
    const {auth, onLogout} = useContext(AuthContext);

    useEffect(() => {
        console.log('auth context', auth)
        fetchPasswords();  
    },[])

    const onLogoutClick = () => {
        onLogout();
    }

    const fetchPasswords= async () => {
        let arr = [...passwords];
        const q = collection(db, "passwords");
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(d) => {
            const docRef = doc(db, "passwords", d.id);
            setDoc(docRef, {id: d.id}, {merge: true})
            if(d.data().id !== 'masterKey'){
                arr = [...arr, d.data()]
            }
          });
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
                auth && (
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