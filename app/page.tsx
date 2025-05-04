'use client';
import { useEffect, useState } from "react";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Skills from "@/components/Skills";
import { FaChevronUp } from "react-icons/fa";

export default function Page() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-sans bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="home" className="pt-24 max-w-screen-xl mx-auto">
        <HomeSection />
      </section>
      <section id="about" className="py-20 max-w-screen-xl mx-auto px-10">
        <AboutSection />
      </section>
      <section id="skills" className="py-20 max-w-screen-xl mx-auto px-12">
        <Skills />
      </section>
      <section id="projects" className="py-20 max-w-screen-xl mx-auto">
        <ProjectsSection />
      </section>
      <section id="contact" className="min-h-screen py-20 max-w-screen-xl mx-auto">
        <ContactSection />
      </section>
      <Footer />
      {showTopBtn && (
        <Link
        href="#home"
        className="fixed bottom-6 p-3 hover:p-4 right-6 bg-blue-500 text-white hover:text-blue-500 rounded-full z-10 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
      >
        <FaChevronUp className="text-2xl" />
      </Link>
      )}
    </main>
  );
}
