"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      await getAuth().signOut();
      router.push('/login'); // Redirige vers la page de connexion après déconnexion
    };

    signOutUser();
  }, [router]);

  return <div>Déconnexion en cours...</div>;
};

export default Logout;
