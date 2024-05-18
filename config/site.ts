export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "MyBluray",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Accueil",
			href: "/",
		},
	],
	navMenuItems: [
		{
			label: "Se déconnecter",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    	sponsor: "https://patreon.com/jrgarciadev"
	},
};
