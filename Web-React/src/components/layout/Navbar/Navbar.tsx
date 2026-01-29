import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  Text,
} from '@/components/common';
import { ROUTES } from '@/utils/constants';

export const Navbar: React.FC = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to={ROUTES.HOME}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services with Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] sm:w-[400px] gap-1 p-3">
              <li>
                <Link
                  to={ROUTES.SERVICES}
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <Text weight="medium" className="text-gray-900 group-hover:text-primary-600">
                    All Services
                  </Text>
                  <Text variant="body-sm" className="text-gray-500 mt-1">
                    Browse all available salon services
                  </Text>
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.SERVICES}?category=hair`}
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <Text weight="medium" className="text-gray-900 group-hover:text-primary-600">
                    Hair Services
                  </Text>
                  <Text variant="body-sm" className="text-gray-500 mt-1">
                    Haircuts, styling, and treatments
                  </Text>
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.SERVICES}?category=beauty`}
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <Text weight="medium" className="text-gray-900 group-hover:text-primary-600">
                    Beauty Services
                  </Text>
                  <Text variant="body-sm" className="text-gray-500 mt-1">
                    Facials, makeup, and spa treatments
                  </Text>
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.SERVICES}?category=wellness`}
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <Text weight="medium" className="text-gray-900 group-hover:text-primary-600">
                    Wellness
                  </Text>
                  <Text variant="body-sm" className="text-gray-500 mt-1">
                    Massage, aromatherapy, and more
                  </Text>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenuRoot>
  );
};
