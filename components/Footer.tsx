import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Name and Description */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold">Subhodeep Pal</h3>
          <p className="text-sm">Personal Portfolio Website.</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-8 text-sm font-medium">
          <Link href="#about" className="hover:underline transition-colors duration-200">
            About me
          </Link>
          <Link href="#skills" className="hover:underline transition-colors duration-200">
            Portfolio
          </Link>
          <Link href="#contact" className="hover:underline transition-colors duration-200">
            Contact me
          </Link>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/sp-202"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-200 transition-colors duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/subhodeep-pal-285b2a220"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-200 transition-colors duration-200"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:subhodeeppal64@gmail.com"
            className="text-2xl hover:text-blue-200 transition-colors duration-200"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/916289699490"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-200 transition-colors duration-200"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-6 text-sm text-blue-200">
        © Subhodeep Pal, all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;