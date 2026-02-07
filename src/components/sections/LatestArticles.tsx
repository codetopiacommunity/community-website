import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { spaceGrotesk } from "@/fonts/fonts";

const articles = [
    {
        id: 1,
        title: "Getting Started with HTML",
        excerpt: "All you need to know about HTML and web design with HTML",
        tags: ["Front-End"],
        readTime: "7 min read",
        author: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?u=john",
        },
        date: "March 10, 2025",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Getting Started with HTML",
        excerpt: "All you need to know about HTML and web design with HTML",
        tags: ["Front-End", "CLI", "CI/CD", "UI/UX"],
        readTime: "7 min read",
        author: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?u=doe",
        },
        date: "March 10, 2025",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Getting Started with HTML",
        excerpt: "All you need to know about HTML and web design with HTML",
        tags: ["Front-End"],
        readTime: "7 min read",
        author: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?u=jane",
        },
        date: "March 10, 2025",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    },
];

export default function LatestArticles() {
    return (
        <section className={`py-12 relative overflow-hidden ${spaceGrotesk.className}`}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/codetopia-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />

            </div>

            <div className="relative z-10 lg:max-w-[80%] mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="inline-block text-2xl font-bold text-ct-primary border-b-4 border-ct-primary pb-2 tracking-wider">
                        LATEST ARTICLES
                    </h2>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-ct-bg-light border-4 border-ct-bg-light shadow-none hover:shadow-ct-heavy-hover hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                        >
                            {/* Card Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="rounded-none bg-ct-secondary text-ct-inverse hover:bg-ct-tertiary font-medium text-[10px] py-0 px-2"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-ct-muted text-xs mb-3">
                                    <BookOpen size={14} />
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className="text-lg font-bold text-ct-inverse mb-2 leading-tight">
                                    {article.title}
                                </h3>

                                <p className="text-ct-muted text-sm mb-6 flex-1">
                                    {article.excerpt}
                                </p>

                                {/* Author & Meta */}
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={article.author.avatar}
                                                alt={article.author.name}
                                                className="w-8 h-8 rounded-full border border-ct-secondary"
                                            />
                                            <span className="text-sm font-bold text-ct-inverse">{article.author.name}</span>
                                        </div>
                                        <span className="text-[10px] text-ct-muted uppercase">{article.date}</span>
                                    </div>

                                    <button className="group/btn bg-ct-bg-light text-ct-inverse text-[10px] font-bold uppercase tracking-[0.15em] border-2 border-ct-inverse py-2 px-6 flex items-center gap-3 shadow-ct-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
                                        READ ARTICLE
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-start">
                    <div className="relative inline-block group">
                        {/* Offset Border */}
                        <div className="absolute inset-0 border border-ct-primary translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>

                        {/* Main Button */}
                        <button className="relative bg-ct-bg-overlay backdrop-blur-sm text-ct-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-ct-primary py-2.5 px-7 flex items-center gap-3 hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                            VIEW ALL ARTICLES <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
