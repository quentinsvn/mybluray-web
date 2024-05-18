// app/bluray/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import { BluRay } from "../../../types/bluray";
import { notFound } from "next/navigation";
import { Card, Image, Spacer, CardHeader, CardBody, Button } from '@nextui-org/react';

interface BlurayDetailsProps {
  params: {
    id: string;
  };
}

const BlurayDetails: React.FC<BlurayDetailsProps> = ({ params }) => {
  const { id } = params;
  const [bluray, setBluray] = useState<BluRay | null>(null);
  const [isInCollection, setIsInCollection] = useState<boolean | null>(null);

  useEffect(() => {
    fetchBluray();
  }, [id]);

  useEffect(() => {
    if (bluray) {
      checkBluray();
    }
  }, [bluray]);

  const fetchBluray = async () => {
    try {
      const docRef = doc(db, "blurays", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        notFound();
      } else {
        setBluray(docSnap.data() as BluRay);
      }
    } catch (error) {
      console.error("Error fetching bluray:", error);
    }
  };

  const checkBluray = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !bluray) return;

      const q = query(collection(db, "blurays"), where("userId", "==", user.uid), where("isbn", "==", bluray.isbn));
      const querySnapshot = await getDocs(q);

      setIsInCollection(!querySnapshot.empty);
    } catch (error) {
      console.log("Error checking bluray:", error);
    }
  };

  const handleAddBluray = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !bluray) return;

      const newBluRay: Omit<BluRay, 'id'> = {
        userId: user.uid,
        isbn: bluray.isbn,
        title: bluray.title,
        image: bluray.image,
        description: bluray.description,
        sortie: bluray.sortie,
        categorie: bluray.categorie,
        duree: bluray.duree,
        editeur: bluray.editeur,
      };

      await addDoc(collection(db, "blurays"), newBluRay);
      alert('Bluray ajouté à votre collection !');
      setIsInCollection(true);
    } catch (error) {
      alert('Erreur lors de l\'ajout du bluray à votre collection');
      console.error("Error adding document:", error);
    }
  };

  const handleDeleteBluray = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !bluray) return;

      const q = query(collection(db, "blurays"), where("userId", "==", user.uid), where("isbn", "==", bluray.isbn));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      alert('Bluray supprimé de votre collection avec succès !');
      setIsInCollection(false);
    } catch (error) {
      console.log("Error deleting documents:", error);
    }
  };

  if (!bluray) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <Card>
              <Image
                src={bluray.image}
                alt={`${bluray.title} cover`}
                width="100%"
                height={300}
              />
            </Card>
          </div>
          <div style={{ flex: 2 }}>
            <Card>
              <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{fontSize: '2em', fontWeight: 'bold'}}>{bluray.title}</h2>
                {isInCollection === null ? (
                  <Button disabled>Vérification...</Button>
                ) : isInCollection ? (
                  <Button color="primary" variant="flat" onClick={handleDeleteBluray}>Supprimer</Button>
                ) : (
                  <Button color="primary" variant="flat" onClick={handleAddBluray}>Ajouter</Button>
                )}
              </CardHeader>
              <CardBody>
                <h4><b>Synopsis</b></h4>
                <p>{bluray.description}</p>
                <Spacer y={1} />
                <h4><b>Catégorie</b></h4>
                <p>{bluray.categorie}</p>
                <Spacer y={1} />
                <h4><b>Durée</b></h4>
                <p>{bluray.duree}</p>
                <Spacer y={1} />
                <h4><b>Éditeur</b></h4>
                <p>{bluray.editeur}</p>
                <Spacer y={1} />
                <h4><b>ISBN</b></h4>
                <p>{bluray.isbn}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlurayDetails;
