# MyBluray

<div align="center">
<img src="https://media.discordapp.net/attachments/1081337869500682301/1244664633579802730/screencapture-mybluray-vercel-app-2024-05-27-16_52_35.png?ex=6655efc5&is=66549e45&hm=f5d22de786922fac92983c976c0587c02c90934a9f22a2986fc367c9ce1e9ed5&=&format=webp&quality=lossless&width=803&height=510" alt="home" width="500"/>
</div>

## Description
MyBluray is an application for managing your physical Blu-Ray and DVD collection. Initially developed as a [mobile application](https://play.google.com/store/apps/details?id=com.distasy.MyBluray), this is its web version.

## Prerequisites

- Node.js >= 20.9.0
- npm >= 10.1.0
- Firebase project

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Firebase](https://firebase.google.com/)

## Getting started

### Firebase configuration
Create and modify the .env.local file from the project root with the following environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app
```

You'll find this information in your Firebase project settings.

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*

```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

### Features

#### Login
<div align="center">
<img src="https://cdn.discordapp.com/attachments/846347343740534811/1241491306543317022/image.png?ex=664bb5e1&is=664a6461&hm=aa56a89b5622c505680971eef29adf791abe5df75d456d05b3da30b9e6075420&" alt="login" width="500"/>
</div>

#### Signup
<div align="center">
<img src="https://media.discordapp.net/attachments/345949387769249793/1241918272195264654/screencapture-mybluray-vercel-app-signup-2024-05-20-02_59_40.png?ex=664bf205&is=664aa085&hm=e083a025afbfa5072914071521e10e04f36d039a11c362cd2cd8ac2373898e49&" alt="login" width="500"/>
</div>

#### Home
<div align="center">
<img src="https://media.discordapp.net/attachments/1081337869500682301/1244664633579802730/screencapture-mybluray-vercel-app-2024-05-27-16_52_35.png?ex=6655efc5&is=66549e45&hm=f5d22de786922fac92983c976c0587c02c90934a9f22a2986fc367c9ce1e9ed5&=&format=webp&quality=lossless" alt="home" width="500"/>
</div>

#### Bluray/DVD détails
<div align="center">
<img src="https://media.discordapp.net/attachments/1081337869500682301/1244664925071343616/screencapture-mybluray-vercel-app-bluray-G9QphT4CxB2RdWU1NGTp-2024-05-27-16_53_52.png?ex=6655f00a&is=66549e8a&hm=09c7241f0e6a5a277a4865cb61891a500b6dab15e4457bf4bd521acfcb3e932e&=&format=webp&quality=lossless" alt="details" width="500"/>
</div>

