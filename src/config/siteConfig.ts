export interface MenuItem {
  name: string;
  title?: string;
  href: string;
  icon?: string;
}

export interface SocialItem {
  name: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  author: string;
  description: string;
  logo?: string;
  menu: MenuItem[];
  social: SocialItem[];
}

export const siteConfig: SiteConfig = {
  title: "mnjm",
  author: "Manjunath Mohan",
  description: "Blazing fast site built with Astro",
  logo: "/favicon.svg",
  menu: [
    { name: "about", title: "About", href: "/about", icon: undefined },
    { name: "projects", title: "Projects", href: "/about#projects", icon: undefined },
  ],
  social: [
    { name: "email", href: "mailto:manjunat.mohan@gmail.com" },
    { name: "github", href: "https://github.com/mnjm" },
    { name: "linkedin", href: "https://linkedin.com/in/mnjm" },
    { name: "twitter", href: "https://twitter.com/_mnjm_" },
  ],
};
