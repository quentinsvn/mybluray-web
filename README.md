# MyBluray

<div align="center">
<img src="https://cdn.discordapp.com/attachments/345949387769249793/1241914202868809800/screencapture-mybluray-vercel-app-2024-05-20-02_42_57.png?ex=664bee3b&is=664a9cbb&hm=da51a4c1bbe3b8bec2c74a4a535f0939ce148a8a21ddb72c5897fdd22cacb145&" alt="home" width="500"/>
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
<img src="https://media.discordapp.net/attachments/345949387769249793/1241914202868809800/screencapture-mybluray-vercel-app-2024-05-20-02_42_57.png?ex=664bee3b&is=664a9cbb&hm=da51a4c1bbe3b8bec2c74a4a535f0939ce148a8a21ddb72c5897fdd22cacb145&" alt="home" width="500"/>
</div>

#### Bluray/DVD détails
<div align="center">
<img src="https://media.discordapp.net/attachments/345949387769249793/1241917882288308244/bluray_details_mybluray.png?ex=664bf1a8&is=664aa028&hm=7b9efc68c6b92ad544fff9f52e1764b32bc2c52d2330b99a498a7bbb324a7f7d&" alt="details" width="500"/>
</div>

