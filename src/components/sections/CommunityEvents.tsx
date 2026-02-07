import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { spaceGrotesk } from "@/fonts/fonts";

const events = [
    {
        id: 1,
        date: "2025-08-12T10:00:00.000Z",
        title: "Introduction to Git",
        tags: ["Front-End Web", "Git", "Github", "VS code"],
        description: "Learn the basics of version control with Git and Github in this interactive workshop.",
        gradient: "from-blue-400 via-purple-500 to-pink-500",
    },
    {
        id: 2,
        date: "2026-10-15T10:00:00.000Z",
        title: "Advanced React Patterns",
        tags: ["React", "Custom Hooks", "Performance"],
        description: "Deep dive into advanced component patterns and performance optimization techniques.",
        gradient: "from-gray-700 via-yellow-600 to-orange-500",
    },
    {
        id: 3,
        date: "2026-11-20T10:00:00.000Z",
        title: "Web Accessibility 101",
        tags: ["A11y", "HTML", "Semantics"],
        description: "Building inclusive web applications that everyone can access and enjoy.",
        gradient: "from-red-500 via-pink-600 to-blue-600",
    },
];

export default function CommunityEvents() {
    return (
        <section className={`py-10 md:py-10 bg-foreground ${spaceGrotesk.className}`}>
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
                            <Card key={event.id} className="gap-0 overflow-hidden border-none shadow-none hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] transition-shadow duration-300 ease-out group bg-card flex flex-col">

                                {/* Card Image / Header Area */}
                                <div className={`h-48 w-full bg-gradient-to-br ${event.gradient} relative p-4 flex justify-between items-start group-hover:scale-105 transition-transform duration-500`}>
                                    <Badge variant={isPast ? "secondary" : "default"} className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                                        {status}
                                    </Badge>

                                    <div className="bg-black/80 backdrop-blur-sm text-white text-center p-2 rounded-sm shadow-sm min-w-[60px]">
                                        <span className="block text-2xl font-bold leading-none">{day}</span>
                                        <span className="block text-[10px] uppercase opacity-80">{monthYear}</span>
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
                                                <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground border-border/60 bg-secondary/50 hover:bg-secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <p className=" text-ct-inverse text-md leading-relaxed relative z-10">
                                        {event.description}
                                    </p>

                                    <div className="pt-2 mt-auto relative z-10">
                                        <button className="w-max bg-white text-black text-xs font-bold uppercase tracking-wider border border-black py-2 px-6 shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.2)] transition-shadow duration-300 ease-in-out">
                                            {action}
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom Action */}
                <div className="flex justify-start ">
                    <button className="bg-[#1F1F1F] text-white text-sm font-bold uppercase tracking-wider py-2 px-8 shadow-[5px_5px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.2)] transition-shadow duration-300 ease-in-out border border-[#1F1F1F]">
                        VIEW ALL EVENTS
                    </button>
                </div>

            </div>
        </section>
    );
}
