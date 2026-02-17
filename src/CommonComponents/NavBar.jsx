import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCFA]/80 backdrop-blur-md border-b border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

       
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-[#f97316] fill-[#f97316]" />
            <span className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-[#1a1a1a]">
              FoodShare
            </span>
          </Link>

          
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-[#6b6b6b] hover:text-[#f97316] transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-[#6b6b6b] hover:text-[#f97316] transition-colors"
            >
              About Us
            </Link>


            <Link
              to="/contact"
              className="text-sm font-medium text-[#6b6b6b] hover:text-[#f97316] transition-colors"
            >
              Contact
            </Link>
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[#1a1a1a] hover:text-[#f97316] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-medium bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1a1a1a]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
{isMenuOpen && (
  <div className="md:hidden bg-[#FDFCFA] border-b border-[#e5e0d8]">
    <div className="px-4 py-4 space-y-3">

      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="block py-2 text-[#6b6b6b] hover:text-[#f97316]"
      >
        Home
      </Link>

      <Link
        to="/about"
        onClick={() => setIsMenuOpen(false)}
        className="block py-2 text-[#6b6b6b] hover:text-[#f97316]"
      >
        About Us
      </Link>

      <Link
        to="/contact"
        onClick={() => setIsMenuOpen(false)}
        className="block py-2 text-[#6b6b6b] hover:text-[#f97316]"
      >
        Contact
      </Link>

      <div className="pt-4 flex flex-col gap-2">

        <Link
          to="/register"
          className="w-full py-2.5 text-center bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c]"
          onClick={() => setIsMenuOpen(false)}
        >
          Register
        </Link>

        <Link
          to="/login"
          className="w-full py-2.5 text-center border border-[#e5e0d8] rounded-lg text-[#1a1a1a] hover:bg-[#f5f3f0]"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign In
        </Link>

      </div>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
