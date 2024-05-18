// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useAuth } from '../hooks/useAuth';
import { BluRay } from '../types/bluray';
import { auth } from '../lib/firebase';
import {Avatar} from "@nextui-org/react";

export const Navbar: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BluRay[]>([]);
  
  useEffect(() => {
    if (user && searchTerm.length > 2) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, user]);

  const handleSearch = async () => {
    try {
      const db = getFirestore();
      const q = query(
        collection(db, "blurays"),
        where("userId", "==", user?.uid || ""),
        orderBy("title"),
        where("title", ">=", searchTerm),
        where("title", "<=", searchTerm + "\uf8ff"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const results: BluRay[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as BluRay);
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching documents: ", error);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const searchInput = (
    <div style={{ position: "relative" }}>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
        labelPlacement="outside"
        placeholder="Rechercher un bluray..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />    
      {searchResults.length > 0 && (
        <ul
          className="absolute z-10 w-full bg-default-100 shadow-lg rounded-md mt-1"
        >
            {searchResults.map((bluray) => (
              <li key={bluray.id}
                className="p-2 hover:bg-default-200 cursor-pointer rounded-md transition-colors duration-200 ease-in-out"
                onClick={() => setSearchTerm("")}
              >
                <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Avatar src={bluray.image} size="sm" className="mr-2" />
                  <span>{bluray.title}</span>                  
                </div>

              </li>
            ))}
        </ul>
      )}
    </div>
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">MyBluray</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          {loading ? (
            <div>Chargement...</div>
          ) : user ? (
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          ) : (
            <Link href="/login">
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                Se connecter
              </Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
