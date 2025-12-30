import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Cat, Rabbit, Fish, Bird, PawPrint } from "lucide-react";
import { Link } from 'react-router-dom';

const categories = [
    { name: "Dogs", icon: Dog, color: "bg-blue-100 text-blue-600", count: "12+ available" },
    { name: "Cats", icon: Cat, color: "bg-orange-100 text-orange-600", count: "8+ available" },
    { name: "Rabbits", icon: Rabbit, color: "bg-green-100 text-green-600", count: "4+ available" },
    { name: "Fish", icon: Fish, color: "bg-cyan-100 text-cyan-600", count: "15+ available" },
    { name: "Birds", icon: Bird, color: "bg-yellow-100 text-yellow-600", count: "6+ available" },
    { name: "Others", icon: PawPrint, color: "bg-purple-100 text-purple-600", count: "5+ available" },
];

const PetCategory = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
                        Search by Category
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find your perfect companion by browsing through our pet categories like Cats, Dogs, and more.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((item) => (
                        <Card
                            key={item.name}
                            className="group hover:shadow-lg transition-all duration-300 border-none bg-secondary/50 cursor-pointer"

                        >
                            <Link to={`/pet-listing?category=${item.name}`}>
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{item.count}</p>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PetCategory;