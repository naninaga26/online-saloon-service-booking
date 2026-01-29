import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User as UserIcon, Calendar, LogOut } from 'lucide-react';
import { Button, Avatar, AvatarFallback, Text } from '@/components/common';
import { Navbar } from '../Navbar';
import { ROUTES } from '@/utils/constants';
import { storage } from '@/utils/storage';
import type { User } from '@/types/user';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = storage.getUser<User>();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    storage.clearAuth();
    navigate(ROUTES.LOGIN);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center shadow-md">
              <Text as="span" variant="body-lg" weight="bold" className="text-white">S</Text>
            </div>
            <Text as="span" variant="body-lg" weight="bold" className="text-gray-900 hidden sm:block">
              Salon Booking
            </Text>
          </Link>

          {/* Navigation - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* Actions - Responsive sizing */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarFallback>{getInitials(user?.name || 'U')}</AvatarFallback>
                    </Avatar>
                    <Text as="span" weight="medium" className="hidden sm:block text-gray-900 text-sm lg:text-base">
                      {user?.name}
                    </Text>
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] sm:min-w-[220px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50"
                    sideOffset={5}
                    align="end"
                  >
                    <DropdownMenu.Item
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate(ROUTES.PROFILE)}
                    >
                      <UserIcon className="w-4 h-4" />
                      <Text as="span" variant="body-sm">Profile</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate(ROUTES.BOOKING_HISTORY)}
                    >
                      <Calendar className="w-4 h-4" />
                      <Text as="span" variant="body-sm">My Bookings</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-gray-200 my-1 md:hidden" />

                    <DropdownMenu.Item
                      className="flex md:hidden items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate(ROUTES.HOME)}
                    >
                      <Text as="span" variant="body-sm">Home</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="flex md:hidden items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate(ROUTES.SERVICES)}
                    >
                      <Text as="span" variant="body-sm">Services</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="flex md:hidden items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate('/about')}
                    >
                      <Text as="span" variant="body-sm">About</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="flex md:hidden items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-900 focus:outline-none focus:bg-primary-50"
                      onSelect={() => navigate('/contact')}
                    >
                      <Text as="span" variant="body-sm">Contact</Text>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                    <DropdownMenu.Item
                      className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-md cursor-pointer hover:bg-red-50 focus:outline-none focus:bg-red-50"
                      onSelect={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      <Text as="span" variant="body-sm">Logout</Text>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" className="text-xs sm:text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
