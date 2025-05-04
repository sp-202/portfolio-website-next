'use client';

import { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-3 tracking-wide">
        Contact Me
      </h2>
      <p className="text-center text-gray-600 mb-12 text-lg">Let&apos;s stay in touch!</p>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Contact Info Section */}
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transform">
              <span className="text-blue-600 text-3xl">
                <FaPhoneAlt />
              </span>
              
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+91 6289699490</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-4xl">
                <MdOutlineEmail />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">subhodeeppal64@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-3xl">
                <FaGithub />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">GitHub</h3>
              <a
                href="https://github.com/sp-202"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                @sp-202
              </a>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transform hover:scale-110 transition-transform duration-300">
              <span className="text-blue-600 text-3xl">
                <SlLocationPin />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              <p className="text-gray-600">Kolkata, West Bengal, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2">
          <div className="bg-white p-8 rounded-xl border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition-all duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <p
                  className={`mt-4 text-center text-sm font-medium ${
                    submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;