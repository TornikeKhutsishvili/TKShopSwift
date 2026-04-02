import React from 'react'

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        Welcome to our website! We are dedicated to providing the best user experience
        with modern web technologies like React and Tailwind CSS. Our goal is to
        deliver fast, responsive, and beautiful interfaces for our users.
      </p>
    </div>
  )
}

export default AboutPage;
