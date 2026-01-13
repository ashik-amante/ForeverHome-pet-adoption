import React from "react"

import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"


const PetCard = ({ pet }) => {
  const { petName, image, location, age, _id, category, adopted } = pet

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
          <p className="px-6 rounded-full shadow-2xl bg-white text-primary font-semibold capitalize">{category}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-foreground">{petName}</h3>
          <div className="flex items-center">
            <Calendar size={16} className="text-primary" />
            <span className="text-muted-foreground ml-2">{age}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
          <span className={`${adopted ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"} px-3 py-1 rounded-full text-xs font-bold ${adopted ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>{adopted ? "Adopted" : "Available"}</span>
        </div>

        {
          !adopted ? (
         <Link
                className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center gap-2 cursor-pointer"
                to={`/pet-details/${pet._id}`}>
                View Details <ArrowRight size={18} />
              </Link>
              
           
          ) : (
            <button
              disabled
              className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl  flex items-center justify-center gap-2 cursor-pointer"

            >
             Adopted
            </button>
          )
        }

      </div>
    </div>
  )
}

export default PetCard
