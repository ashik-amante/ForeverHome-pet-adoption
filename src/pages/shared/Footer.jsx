import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight">ForeverHome</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We are passionate about leveraging technology to make a positive impact on the lives of animals. Our mission is to unite pets with their forever families.
            </p>
            <div className="flex space-x-4 pt-2">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/pet-listing" className="hover:text-primary transition-colors">Pet Listing</Link></li>
              <li><Link to="/donations" className="hover:text-primary transition-colors">Donation Campaigns</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Section 3: Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/category/cats" className="hover:text-primary transition-colors">Cats</Link></li>
              <li><Link to="/category/dogs" className="hover:text-primary transition-colors">Dogs</Link></li>
              <li><Link to="/category/rabbits" className="hover:text-primary transition-colors">Rabbits</Link></li>
              <li><Link to="/category/fish" className="hover:text-primary transition-colors">Fish</Link></li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (555) 000-PETS</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>abdullahashik17@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 ForeverHome. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:underline">Privacy Policy</Link>
            <Link to="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
