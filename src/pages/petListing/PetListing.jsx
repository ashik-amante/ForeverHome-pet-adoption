import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PetCard from '../shared/PetCard';

const PetListing = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const pets = [
    { id: 1, name: "Buddy", age: "2 Years", location: "Dhaka", category: "Dogs", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1", date: "2024-05-20" },
    { id: 2, name: "Luna", age: "1 Year", location: "Chittagong", category: "Cats", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", date: "2024-05-21" },
    { id: 3, name: "Snowy", age: "6 Months", location: "Sylhet", category: "Rabbits", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308", date: "2024-05-22" },

  ];

  
  const sortedPets = pets.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search and Filter Section  */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-secondary/30 p-6 rounded-2xl">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Search pets by name..." 
            className="pl-10 h-12 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dogs">Dogs</SelectItem>
              <SelectItem value="cats">Cats</SelectItem>
              <SelectItem value="rabbits">Rabbits</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3-Column Grid Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
       
        ))}
        
      </div>
    </div>
  );
};

export default PetListing;