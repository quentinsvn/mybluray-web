// pages/signup.js
"use client";
import { Card, Input, Button, Spacer, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
// style
import './style.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const [email, setEmail] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [nom, setNom] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [error, setError] = React.useState('');

    const router = useRouter();

    const auth = getAuth();

    const handleRegister = () => {
        if (password !== passwordConfirm) {
            setError('Les mots de passe ne correspondent pas');
            alert(error);
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            // Create user in firestore
            .then((userCredential) => {
                const user = userCredential.user;
                const db = getFirestore();
                addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: email,
                    prenom: prenom,
                    nom: nom
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            }
            )
            .then(() => {
                // Signed in 
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                // If password is too weak, display error message
                if (errorCode === 'auth/weak-password') {
                    alert('Mot de passe trop faible');
                }

                // If email is already in use, display error message
                if (errorCode === 'auth/email-already-in-use') {
                    alert('Email déjà utilisé');
                }

                // If email is invalid, display error message
                if (errorCode === 'auth/invalid-email') {
                    alert('Email invalide');
                }
                
                // If confirm password is not the same as password, display error message
                if (errorCode === 'auth/operation-not-allowed') {
                    alert('Les mots de passe ne correspondent pas');
                }
            });
        }
    }
  return (
    <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{ width: '50%', maxWidth: '400px', padding: '20px' }}>
        <CardHeader>
          <h2 style={{ margin: 0, fontSize: '20px' }}><b>Créer un compte</b></h2>
        </CardHeader>
        <CardBody>

            <Input type="text"
                label="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
            />

            <Spacer y={1} />

            <Input type="text"
                label="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <Spacer y={1} />

            <Input type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <Spacer y={1} />
            <Input type="password" 
                label="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Spacer y={1} />

            <Input type="password" 
                label="Confirmer le mot de passe"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <Spacer y={3} />

            <Button style={{ width: '100%' }} 
            type='submit'
            onClick={handleRegister}
            >
                S'inscrire
            </Button>

            <Spacer y={1} />
            <div style={{ textAlign: 'center' }}>
                <Link href="/login">J'ai déjà un compte</Link>
            </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupPage;
