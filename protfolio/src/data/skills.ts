import type { Skill } from '../types';

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', proficiency: 95 },
  { name: 'TypeScript', category: 'frontend', proficiency: 90 },
  { name: 'Next.js', category: 'frontend', proficiency: 88 },
  { name: 'Three.js', category: 'frontend', proficiency: 80 },
  { name: 'Framer Motion', category: 'frontend', proficiency: 85 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 95 },
  { name: 'GSAP', category: 'frontend', proficiency: 75 },
  { name: 'Node.js', category: 'backend', proficiency: 85 },
  { name: 'PostgreSQL', category: 'backend', proficiency: 80 },
  { name: 'Firebase', category: 'backend', proficiency: 75 },
  { name: 'Docker', category: 'backend', proficiency: 70 },
  { name: 'UI/UX Design', category: 'design', proficiency: 90 },
  { name: 'Figma', category: 'design', proficiency: 92 },
  { name: 'Brand Identity', category: 'design', proficiency: 85 },
  { name: 'Motion Design', category: 'design', proficiency: 80 },
  { name: 'Git', category: 'tools', proficiency: 95 },
  { name: 'Vite', category: 'tools', proficiency: 90 },
  { name: 'CI/CD', category: 'tools', proficiency: 80 },
  { name: 'Testing (Vitest)', category: 'tools', proficiency: 75 },
];

export const getSkillsByCategory = (category: Skill['category']): Skill[] =>
  skills.filter(s => s.category === category).sort((a, b) => b.proficiency - a.proficiency);

export const skillCategories = [
  { key: 'frontend', label: 'Frontend', icon: 'code' },
  { key: 'backend', label: 'Backend', icon: 'server' },
  { key: 'design', label: 'Design', icon: 'palette' },
  { key: 'tools', label: 'Tools', icon: 'wrench' },
] as const;