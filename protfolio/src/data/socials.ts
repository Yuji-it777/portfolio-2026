import type { SocialLink, NavLink } from '../types';

export const socialLinks: SocialLink[] = [
  { label: 'Twitter', href: 'https://twitter.com/Yuji_it777', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mouad-gog', icon: 'linkedin' },
  { label: 'Dribbble', href: 'https://dribbble.com/Yuji_it777', icon: 'dribbble' },
  { label: 'GitHub', href: 'https://github.com/Yuji-it777', icon: 'github' },
  { label: 'Email', href: 'mailto:mouadgog7@icloud.com', icon: 'mail' },
];

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const siteConfig = {
  name: 'Mouad',
  title: 'Creative Developer',
  location: 'Marrakech, Morocco',
  email: 'mouadgog7@icloud.com',
  description: 'I craft digital experiences that blend creativity with code.',
  ogImage: '/assets/og-image.png',
};