import React from "react";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl px-6 md:px-12 flex flex-col items-center text-center gap-8">
        {/* Heading */}
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl md:text-6xl leading-tight">
          <span className="text-purple-600">Discover Your Next Adventure</span>
          <br />
          with an AI-Personalised Itinerary
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-600">
          Your AI-powered trip planner and travel curator, built to design
          personalised itineraries tailored to your interests, schedule, and
          budget.
        </p>

        {/* CTA */}
        <Link to="/create-trip">
          <Button className="px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition">
            Get Started — It’s Free
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="w-full mt-10 flex justify-center">
          <img
            src="/landing.jpeg"
            alt="AI travel planning illustration"
            className="w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
