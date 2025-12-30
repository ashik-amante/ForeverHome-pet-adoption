import React from "react"

import { ArrowRight, Calendar, MapPin } from "lucide-react"


const PetCard = ({pet}) => {
    const {name,image,location,age} = pet
  return (
    <div className="group bg-background border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt="Pet"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
            <p className="px-6 rounded-full shadow-2xl bg-white text-yellow-700">Pet</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-foreground">{name}</h3>
          <div className="flex items-center">
            <Calendar size={16} className="text-primary" />
            <span className="text-muted-foreground ml-2">{age}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={16} className="text-primary" />
          <span>{location}</span>
        </div>

         <button 
                className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
               
              >
                View Details
                <ArrowRight size={18} />
              </button>
      </div>
    </div>
  )
}

export default PetCard
