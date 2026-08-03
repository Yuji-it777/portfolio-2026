import React from 'react';

const Hero = () => (
  <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to My Portfolio</h1>
      <p className="text-xl md:text-2xl mb-10">Crafting beautiful websites with React and Tailwind</p>
      <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">Get Started</button>
    </div>
  </section>
);

export default Hero;

// Similar components for About, Portfolio, etc. can be created with responsive classes
// Example for About section:
const About = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img src="/profile.jpg" alt="Profile" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg mb-6">Passionate developer with 5+ years of experience...</p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:underline">LinkedIn</a>
            <a href="#" className="text-blue-500 hover:underline">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;

// Add similar components for Portfolio, Skills, Process, Testimonials, and Contact sections with responsive design