// pages/login.js
"use client";
import { useEffect, useState } from 'react';
import { Card, Input, Button, Spacer, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';
// style
import './style.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
              router.push('/');
          } else {
              router.push('/login');
          }
      });
      return unsubscribe;
    }, []);

    const login = () => {
        //const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            router.push('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode);
            // If user is not found, display error message
            if (errorCode === 'auth/user-not-found') {
              alert('Utilisateur non trouvé');
            }

            // If password is wrong, display error message
            if (errorCode === 'auth/wrong-password') {
              alert('Mot de passe incorrect');
            }

            // If user is disabled, display error message
            if (errorCode === 'auth/user-disabled') {
              alert('Utilisateur désactivé');
            }

            // If user is not found, display error message
            if (errorCode === 'auth/invalid-email') {
              alert('Email invalide');
            }

            // invalid-credentiel
            if (errorCode === 'auth/invalid-credential') {
              alert('Email invalide');
            }
        });
    }

  return (
    <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{ width: '50%', maxWidth: '400px', padding: '20px' }}>
        <CardHeader>
          <h2 style={{ margin: 0, fontSize: '20px' }}><b>Connexion</b></h2>
        </CardHeader>
        <CardBody>
            <Input type="email"
             label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            
            <Spacer y={1} />
            <Input type="password" 
            label="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <Spacer y={3} />
            <Button style={{ width: '100%' }} 
            type='submit'
            onClick={login}
            >Se connecter</Button>

            <Spacer y={1} />
            <div style={{ textAlign: 'center' }}>
              <Link href="/signup">Créer un compte</Link>
            </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
