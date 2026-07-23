import {
  Award,
  Briefcase,
  Calendar,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export const adminNavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Content Management",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Events",
          url: "/admin/events",
          icon: Calendar,
        },
        {
          title: "Articles",
          url: "/admin/articles",
          icon: FileText,
        },
        {
          title: "Gallery",
          url: "/admin/gallery",
          icon: ImageIcon,
        },
        {
          title: "Impact",
          url: "/admin/impact",
          icon: Star,
        },
        {
          title: "Wall of Impact",
          url: "/admin/recognition",
          icon: Award,
        },
        {
          title: "Spotlight",
          url: "/admin/spotlight",
          icon: Sparkles,
        },
        {
          title: "Careers",
          url: "/admin/careers",
          icon: Briefcase,
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Mentorships",
          url: "/admin/mentorships",
          icon: Award,
        },
        {
          title: "Newsletter",
          url: "/admin/newsletter",
          icon: Mail,
        },
      ],
    },
  ],
};
