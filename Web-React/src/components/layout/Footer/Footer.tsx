import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Separator, Text } from '@/components/common';
import { ROUTES } from '@/utils/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    services: [
      { name: 'Browse Services', href: ROUTES.SERVICES },
      { name: 'Book Appointment', href: ROUTES.BOOKING },
      { name: 'My Bookings', href: ROUTES.BOOKING_HISTORY }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cancellation Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@salonbooking.com' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center shadow-md">
                <Text as="span" variant="body-lg" weight="bold" className="text-white">
                  S
                </Text>
              </div>
              <Text as="span" variant="body-lg" weight="bold" className="text-white">
                Salon Booking
              </Text>
            </div>
            <Text variant="body-sm" className="text-gray-400 mb-4">
              Book your beauty and wellness appointments with ease. Professional services at your convenience.
            </Text>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <Text variant="h6" className="text-white mb-4">Company</Text>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <Text variant="h6" className="text-white mb-4">Services</Text>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <Text variant="h6" className="text-white mb-4">Legal</Text>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Text variant="body-sm" className="text-gray-400">
            © {currentYear} Salon Booking. All rights reserved.
          </Text>
          <Text variant="body-sm" className="text-gray-400">
            Made with ❤️ for beauty enthusiasts
          </Text>
        </div>
      </div>
    </footer>
  );
};
