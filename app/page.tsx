// components/HomePage.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Spacer, CardFooter, Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase';
import { BluRay } from '../types/bluray';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [blurays, setBlurays] = React.useState<BluRay[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [randomBlurays, setRandomBlurays] = React.useState<BluRay[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      getBlurays(user);
	  getRandomBluraysForCarousel(user);
    }
  }, [user, authLoading]);

  const getBlurays = async (user: any) => {
    try {
      const q = query(collection(db, "blurays"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const blurays: BluRay[] = [];
      querySnapshot.forEach((doc) => {
        blurays.push({ id: doc.id, ...doc.data() } as BluRay);
      });
      setBlurays(blurays);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getBluraysByActionCategory = async (category: string) => {
	try {
	  const q = query(collection(db, "blurays"), where("categorie", "==", category));
	  const querySnapshot = await getDocs(q);
	  const blurays: BluRay[] = [];
	  querySnapshot.forEach((doc) => {
		blurays.push({ id: doc.id, ...doc.data() } as BluRay);
	  });
	  setBlurays(blurays);
	} catch (error) {
	  console.error("Error getting documents: ", error);
	} finally {
	  setLoading(false);
	}
  };

  const getRandomBluraysForCarousel = async (user: any) => {
	// Get all blurays randomly
	try {
	  const q = query(collection(db, "blurays"), where("userId", "==", user.uid));
	  const querySnapshot = await getDocs(q);
	  const blurays: BluRay[] = [];
	  querySnapshot.forEach((doc) => {
		blurays.push({ id: doc.id, ...doc.data() } as BluRay);
	  }
	  );
	  // Get 5 random blurays
	  const randomBlurays: BluRay[] = [];
	  for (let i = 0; i < 5; i++) {
		const randomIndex = Math.floor(Math.random() * blurays.length);
		randomBlurays.push(blurays[randomIndex]);
	  }
	  setRandomBlurays(randomBlurays);
	} catch (error) {
		console.error("Error getting documents: ", error);
	}
  };

  if (authLoading || loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      {/* Carrousel */}
      <Swiper
        navigation
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
      >
        {randomBlurays.map((bluray, index) => (
		  <SwiperSlide key={index}>
			<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
			  <Image
				removeWrapper
				alt="Relaxing app background"
				className="z-0 w-full h-full object-cover"
				src={bluray.image}
			  />
			  <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
				<div className="flex flex-grow gap-2 items-center">
				  <div className="flex flex-col">
					<p className="text-tiny text-white/60">{bluray.title}</p>
					<p className="text-tiny text-white/60">{bluray.categorie}</p>
				  </div>
				</div>
				<Button radius="full" size="sm" onClick={() => router.push(`/bluray/${bluray.id}`)}>
				  Voir
				</Button>
			  </CardFooter>
			</Card>
		  </SwiperSlide>
		))}
      </Swiper>

	{/* Catégories */}
	<Spacer y={2} />
	<h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>Catégories</h3>

	<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
		<Button onClick={() => getBluraysByActionCategory('Action')}>Action</Button>
		<Button onClick={() => getBluraysByActionCategory('Comédie')}>Comédie</Button>
		<Button onClick={() => getBluraysByActionCategory('Drame')}>Drame</Button>
		<Button onClick={() => getBluraysByActionCategory('Horreur')}>Horreur</Button>
		<Button onClick={() => getBluraysByActionCategory('Science-fiction')}>Science-fiction</Button>
		<Button onClick={() => getBluraysByActionCategory('Thriller')}>Thriller</Button>
	</div>

      {/* Recommandations */}
      <Spacer y={2} />
      <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>Recommandations</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Swiper
          navigation
          spaceBetween={50}
          slidesPerView={4}
          modules={[Navigation, Pagination]}
		  breakpoints={{
			0: {
			  slidesPerView: 1,
			},
			400:{
			  slidesPerView:2,
			},
			639: {
			  slidesPerView: 3,
			},
			865:{
			  slidesPerView:4
			},
			1000:{
			  slidesPerView:5
			},
			1500:{
			  slidesPerView:6
			},
			1700:{
			  slidesPerView:7
			}
		  }}
        >
          {blurays.map((bluray, index) => (
            <SwiperSlide key={index}>
              <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={bluray.image}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">{bluray.title}</p>
                      <p className="text-tiny text-white/60">{bluray.categorie}</p>
                    </div>
                  </div>
				  	<Button radius="full" size="sm" onClick={() => router.push(`/bluray/${bluray.id}`)}>
                    	Voir
                	</Button>
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


    </div>
  );
};

export default Home;

