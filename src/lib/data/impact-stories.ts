export interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  image: string;
  logo: string;
  date: string;
  location: string;
  link?: string;
  galleryLink?: string;
}

export const impactStories: ImpactStory[] = [
  {
    id: 1,
    title: "Django Girls Koforidua",
    impact:
      "Partnered to teach web fundamentals. Helped over 40 women deploy their first working application online.",
    image:
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Django_Girls_logo.svg/1200px-Django_Girls_logo.svg.png",
    date: "23 - 25 March 2025",
    location: "Koforidua Library",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Sample YouTube link
  },
  {
    id: 2,
    title: "Local High School Initiative",
    impact:
      "Introduced Python and basic web concepts to 40 seniors, resulting in a 30% increase in CS majors.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    logo: "https://via.placeholder.com/150/09090b/ffffff?text=Prempeh",
    date: "05 September 2025",
    location: "Prempeh College",
    galleryLink: "https://unsplash.com/s/photos/high-school", // Sample gallery link
  },
  {
    id: 3,
    title: "Django Girls Bootcamp",
    impact:
      "Partnered to teach web fundamentals. Helped over 60 women deploy their first working application online.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Django_Girls_logo.svg/1200px-Django_Girls_logo.svg.png",
    date: "14 August 2025",
    location: "Lagos, Nigeria",
    link: "https://www.youtube.com/watch?v=ScMzIvxBSi4", // Sample YouTube link
    galleryLink: "https://unsplash.com/s/photos/high-school",
  },
  {
    id: 4,
    title: "Developer Hub Accra",
    impact:
      "Refactored legacy codebases alongside junior developers, accelerating their transition into mid-level engineering roles.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    logo: "https://via.placeholder.com/150/09090b/ffffff?text=ADC",
    date: "01 - 10 July 2025",
    location: "Accra Digital Center",
    galleryLink: "https://unsplash.com/s/photos/developers", // Sample gallery link
  },
  {
    id: 5,
    title: "Django Girls Koforidua",
    impact:
      "Partnered to teach web fundamentals. Helped over 40 women deploy their first working application online.",
    image:
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Django_Girls_logo.svg/1200px-Django_Girls_logo.svg.png",
    date: "23 - 25 March 2025",
    location: "Koforidua Library",
  },
  {
    id: 6,
    title: "Local High School Initiative",
    impact:
      "Introduced Python and basic web concepts to 40 seniors, resulting in a 30% increase in CS majors.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    logo: "https://via.placeholder.com/150/09090b/ffffff?text=Prempeh",
    date: "05 September 2025",
    location: "Prempeh College",
  },
  {
    id: 7,
    title: "Django Girls Bootcamp",
    impact:
      "Partnered to teach web fundamentals. Helped over 60 women deploy their first working application online.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Django_Girls_logo.svg/1200px-Django_Girls_logo.svg.png",
    date: "14 August 2025",
    location: "Lagos, Nigeria",
  },
  {
    id: 8,
    title: "Developer Hub Accra",
    impact:
      "Refactored legacy codebases alongside junior developers, accelerating their transition into mid-level engineering roles.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    logo: "https://via.placeholder.com/150/09090b/ffffff?text=ADC",
    date: "01 - 10 July 2025",
    location: "Accra Digital Center",
  },
];
