import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-[#f97316] fill-[#f97316]" />
              <span className="text-xl font-bold tracking-wide">
                FoodShare
              </span>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed">
              Connecting donors and volunteers to distribute surplus food to those in need.
              Together, we reduce waste and fight hunger.
            </p>

            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-white/10 hover:bg-[#f97316] hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-[#f97316] text-sm">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-[#f97316] text-sm">About Us</Link></li>
              <li><Link to="/donor/register" className="text-white/70 hover:text-[#f97316] text-sm">Become a Donor</Link></li>
              <li><Link to="/volunteer/register" className="text-white/70 hover:text-[#f97316] text-sm">Become a Volunteer</Link></li>
            </ul>
          </div>

          {/* Important Pages */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Important</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-white/70 hover:text-[#f97316] text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#f97316] text-sm">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-white/70 hover:text-[#f97316] text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-[#f97316] text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#f97316]" />
                Kerala, India
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f97316]" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f97316]" />
                foodshare.help@gmail.com
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} FoodShare. Built with{" "}
            <Heart className="inline h-4 w-4 text-[#f97316] fill-[#f97316]" /> 
            to reduce hunger and food waste.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
