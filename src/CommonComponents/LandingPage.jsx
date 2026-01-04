import { Link } from "react-router-dom";
import { FaUsers, FaLeaf } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { Heart, ArrowRight } from "lucide-react";

import NavBar from "../CommonComponents/NavBar";
import Footer from "../CommonComponents/Footer";

const LandingPage = () => {
  return (
    <main className="relative">
      {/* NAVBAR */}
      <div className="absolute top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">
        <img
          src="/food.jpg"
          alt="Community sharing food together"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,25,20,0.4) 0%, rgba(30,25,20,0.7) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16">
          <span className="inline-block px-4 py-2 rounded-full bg-[#f97316]/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            🌱 Join the movement against hunger
          </span>

          <h1 className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Feed a Family <br />
            <span className="text-[#f97316]">Today</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join hands with us to reduce food waste and feed the hungry. Every
            meal shared is a life touched.
          </p>

          {/* HERO BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-[#f97316] text-white rounded-full shadow-lg hover:bg-[#ea580c] hover:shadow-xl transition-all"
            >
              <Heart className="h-5 w-5" />
              Donate Now
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-white/10 border border-white/30 text-white rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Become a Volunteer
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-[#f5f3f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50,000+", label: "Meals Delivered" },
              { value: "200+", label: "Volunteers" },
              { value: "150+", label: "Partner Donors" },
              { value: "25+", label: "Communities Served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-['Playfair_Display',Georgia,serif] text-3xl md:text-4xl font-bold text-[#f97316] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#6b6b6b] font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFCFA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#f97316] font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#1a1a1a]">
              Our Mission & Impact
            </h2>
            <p className="text-[#6b6b6b] max-w-2xl mx-auto text-lg leading-relaxed">
              We unite donors, volunteers, and NGOs to reduce food waste, feed
              the hungry, and create sustainable impact in communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#f97316]/10">
                <FaUsers className="text-3xl text-[#f97316]" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Dedicated Volunteers
              </h3>
              <p className="text-[#6b6b6b] text-center">
                Volunteers deliver surplus food from donors to those in need.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-[#1a1a1a] text-white">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white/10">
                <MdFoodBank className="text-3xl text-[#f97316]" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Trusted Food Donors
              </h3>
              <p className="text-white/80 text-center">
                Restaurants and households donate surplus food daily.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#22c55e]/10">
                <FaLeaf className="text-3xl text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Sustainable Impact
              </h3>
              <p className="text-[#6b6b6b] text-center">
                Reducing food waste helps people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#f97316] text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-white/90 mb-10">
          Donate food, volunteer, or support the cause today.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-4 bg-white text-[#f97316] rounded-full font-medium"
          >
            Start Donating
          </Link>

          <Link
            to="/register"
            className="px-8 py-4 border border-white text-white rounded-full"
          >
            Join as Volunteer
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LandingPage;
