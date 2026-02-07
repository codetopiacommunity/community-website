import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { spaceGrotesk } from "@/fonts/fonts";

const events = [
    {
        id: 1,
        date: "2025-08-12T10:00:00.000Z",
        title: "Introduction to Git",
        tags: ["Front-End Web", "Git", "Github", "VS code"],
        description: "Learn the basics of version control with Git and Github in this interactive workshop.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        date: "2026-10-15T10:00:00.000Z",
        title: "Advanced React Patterns",
        tags: ["React", "Custom Hooks", "Performance"],
        description: "Deep dive into advanced component patterns and performance optimization techniques.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        date: "2026-11-20T10:00:00.000Z",
        title: "Web Accessibility 101",
        tags: ["A11y", "HTML", "Semantics"],
        description: "Building inclusive web applications that everyone can access and enjoy.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    },
];

export default function CommunityEvents() {
    return (
        <section className={`py-10 md:py-10 bg-foreground p-3 ${spaceGrotesk.className}`}>
            <div className="relative z-10 lg:max-w-[80%] mx-auto py-10">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="inline-block text-2xl font-medium text-ct-inverse border-b-2 border-ct-inverse pb-2">
                        COMMUNITY & TECH EVENTS
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent mx-auto w-1/2"></span>
                    </h2>
                    <p className="text-center text-ct-inverse mb-5 max-w-3xl mx-auto">
                        A thriving tech community where developers, designers, and tech enthusiasts come together to learn, share, and grow
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {events.map((event) => {
                        const eventDate = new Date(event.date);
                        const today = new Date();
                        const isPast = eventDate < today;
                        const status = isPast ? "Past Event" : "Upcoming Event";
                        const action = isPast ? "VIEW EVENT" : "JOIN EVENT";

                        // Format date for display
                        const day = eventDate.getDate();
                        const monthYear = eventDate.toLocaleDateString("en-GB", { month: "short", year: "numeric" });

                        return (
                            <Card key={event.id} className="gap-0 overflow-hidden border-none shadow-none hover:shadow-ct-card-hover hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-out group bg-card flex flex-col">

                                {/* Card Image / Header Area */}
                                <div className="h-48 w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 p-4 flex justify-between items-start">
                                        <Badge variant={isPast ? "secondary" : "default"} className="bg-ct-bg-dark/50 hover:bg-ct-bg-dark/70 text-ct-primary border-0 backdrop-blur-sm rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                                            {status}
                                        </Badge>

                                        <div className="bg-ct-bg-dark/80 backdrop-blur-sm text-ct-primary text-center p-2 rounded-sm shadow-sm min-w-[60px]">
                                            <span className="block text-2xl font-bold leading-none">{day}</span>
                                            <span className="block text-[10px] uppercase opacity-80">{monthYear}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <CardContent className="p-6 flex-1 flex flex-col space-y-4 bg-card relative">
                                    <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.1] pointer-events-none select-none  ">
                                        <img
                                            src="/images/Codetopia-Logo-TB.png"
                                            alt=""
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="space-y-2 relative z-10">
                                        <h3 className="text-2xl font-bold tracking-tight text-ct-inverse">{event.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="rounded-none bg-ct-secondary text-ct-inverse hover:bg-ct-tertiary font-medium text-[10px] py-0 px-2 border-none">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <p className=" text-ct-inverse text-md leading-relaxed relative z-10">
                                        {event.description}
                                    </p>

                                    <div className="pt-2 mt-auto relative z-10 w-max">
                                        <button className="group/btn bg-ct-bg-light text-ct-inverse text-[10px] font-bold uppercase tracking-[0.15em] border-2 border-ct-inverse py-2 px-6 flex items-center gap-3 shadow-ct-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
                                            {action}
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom Action */}
                <div className="flex justify-start">
                    <button className="bg-ct-inverse text-ct-primary text-[12px] font-bold uppercase tracking-[0.1em] py-3 px-10 shadow-ct-btn hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all duration-200">
                        VIEW ALL EVENTS
                    </button>
                </div>

            </div>
        </section>
    );
}
