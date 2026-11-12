export interface ExperienceItem {
  title: string;
  company: string;
  company_url: string;
  logo_path: string;
  duration: string;
  location: string;
  description: string[];
}

export interface ExperienceSection {
  title: string;
  experiences: ExperienceItem[];
}

export interface ExperienceData {
  title: string;
  sub_title: string;
  description: string;
  header_image_path: string;
  sections: ExperienceSection[];
}

export interface Degree {
  title: string;
  subtitle: string;
  logo_path: string;
  alt_name: string;
  duration: string;
  descriptions: string[];
  website_link: string;
}

export interface SkillItem {
  name: string;
  iconifyClass: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface SkillsData {
  title: string;
  subtitle: string;
  description: string;
  header_image_path: string;
  categories: SkillCategory[];
}

export interface ProjectLanguage {
  name: string;
  iconifyClass: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  languages: ProjectLanguage[];
}

export interface SocialMediaLinks {
  github?: string;
  linkedin?: string;
  gmail?: string;
  gitlab?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface TestimonialReview {
  rating: number;
  text: string;
}

export interface TestimonialClient {
  id: string;
  name: string;
  countryCode: string;
  country: string;
  reviews: TestimonialReview[];
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  clients: TestimonialClient[];
}

export interface PortfolioData {
  name: string;
  title: string;
  sub_title: string;
  description: string;
  experience: ExperienceData;
  degrees: Degree[];
  skills: SkillsData;
  projects: Project[];
  testimonials: TestimonialsData;
  socialMediaLinks: SocialMediaLinks;
}
