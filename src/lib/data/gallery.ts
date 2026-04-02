export type GalleryAlbum = {
  slug: string;
  title: string;
  date: string;
  category: "Event" | "Meetup" | "Community";
  coverImage: string;
  photos: { id: string; src: string; alt: string }[];
};

export const albums: GalleryAlbum[] = [
  {
    slug: "django-girls-koforidua-2024",
    title: "Django Girls Koforidua",
    date: "2024",
    category: "Event",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    photos: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85",
        alt: "Opening session",
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=85",
        alt: "Workshop in progress",
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=85",
        alt: "Group photo",
      },
      {
        id: "4",
        src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85",
        alt: "Participants collaborating",
      },
      {
        id: "5",
        src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85",
        alt: "Speaker session",
      },
      {
        id: "6",
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85",
        alt: "Coding session",
      },
    ],
  },
  {
    slug: "ieee-meetup-2024",
    title: "IEEE CS Meetup",
    date: "2024",
    category: "Meetup",
    coverImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    photos: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85",
        alt: "Panel discussion",
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85",
        alt: "Networking session",
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85",
        alt: "Community members",
      },
      {
        id: "4",
        src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85",
        alt: "Team discussion",
      },
    ],
  },
  {
    slug: "community-hackathon-2024",
    title: "Community Hackathon",
    date: "2024",
    category: "Event",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    photos: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85",
        alt: "Hackathon teams",
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85",
        alt: "Builders at work",
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85",
        alt: "Late night coding",
      },
      {
        id: "4",
        src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85",
        alt: "Presentations",
      },
      {
        id: "5",
        src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85",
        alt: "Winners",
      },
    ],
  },
  {
    slug: "open-source-sprint-2024",
    title: "Open Source Sprint",
    date: "2024",
    category: "Community",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    photos: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85",
        alt: "Sprint kickoff",
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85",
        alt: "Contributors",
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85",
        alt: "Code review session",
      },
    ],
  },
];
