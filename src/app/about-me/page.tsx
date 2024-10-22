// src/app/about/page.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        Hello! My name is <strong>Saransh Saluja</strong>, and I am a passionate intern and web developer currently pursuing my degree in Computer Science Engineering at NSUT. I have a strong interest in building innovative web applications and honing my skills in various programming languages and frameworks.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Background</h2>
      <p className="mb-4">
        I have completed courses in RPA Development and Web Development. I am proficient in React, JavaScript, HTML, and CSS, and I'm currently exploring technologies like Tailwind CSS and Firebase. I enjoy tackling complex challenges and constantly learning new technologies to enhance my development skills.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Web Development (React, Next.js)</li>
        <li>Programming Languages (JavaScript, Python)</li>
        <li>Database Management (Firebase)</li>
        <li>Responsive Web Design (Tailwind CSS)</li>
        <li>Version Control (Git)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Interests</h2>
      <p className="mb-4">
        In addition to programming, I have a keen interest in AI and its applications in everyday life. I enjoy reading about the latest trends in technology and am excited about how AI is shaping the future.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Connect with Me</h2>
      <p>
        Feel free to reach out to me on my LinkedIn profile: 
        <a 
          href="https://in.linkedin.com/in/saransh-saluja-787129282" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 underline"
        >
          {" "}LinkedIn
        </a>
        .
      </p>
    </div>
  );
};

export default About;
