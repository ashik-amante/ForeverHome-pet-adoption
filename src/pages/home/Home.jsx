import React from 'react'
import Banner from './Banner'
import PetCategory from './Categories'
import AdoptionCTA from './AdoptionCTA'
import AboutUs from './AboutUs'

const Home = () => {
  return (
    <div>
        <Banner/>
        <PetCategory/>
        <AdoptionCTA/>
        <AboutUs/>
    </div>
  )
}

export default Home