// pages/bluray.js
import { Card, Image, Spacer, CardHeader, CardBody, Button } from '@nextui-org/react';

const DetailsPage = () => {
  const blurayDetails = {
    title: "Inception",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    coverImage: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", // Example image URL
    category: "Science Fiction",
    duration: "148 minutes",
    publisher: "Warner Bros.",
    isbn: "978-3-16-148410-0"
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <Card>
              <Image
                src={blurayDetails.coverImage}
                alt={`${blurayDetails.title} cover`}
                width="100%"
                height={300}
              />
          </Card>
        </div>
        <div style={{ flex: 2 }}>
          <Card>
            <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{fontSize: '2em', fontWeight: 'bold'}}>{blurayDetails.title}</h2>
                <Button color="primary" variant="flat">Ajouter</Button> 
            </CardHeader>
            <CardBody>
              <h4><b>Synopsis</b></h4>
              <p>{blurayDetails.synopsis}</p>
              <Spacer y={1} />
              <h4><b>Catégorie</b></h4>
              <p>{blurayDetails.category}</p>
              <Spacer y={1} />
              <h4><b>Durée</b></h4>
              <p>{blurayDetails.duration}</p>
              <Spacer y={1} />
              <h4><b>Éditeur</b></h4>
              <p>{blurayDetails.publisher}</p>
              <Spacer y={1} />
              <h4><b>ISBN</b></h4>
              <p>{blurayDetails.isbn}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
