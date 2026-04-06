import {
  Calendar,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  Settings,
  Star,
  Users,
  Users2,
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
      ],
    },
    {
      title: "Community",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Manage Team",
          url: "/admin/team",
          icon: Users2,
        },
        {
          title: "Newsletter",
          url: "/admin/newsletter",
          icon: Mail,
        },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
