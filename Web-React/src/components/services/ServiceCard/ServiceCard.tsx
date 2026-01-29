import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { Card, Badge, Button, Text } from '@/components/common';
import { formatCurrency } from '@/utils/helpers';
import type { Service } from '@/types/service';

export interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const discountedPrice = service.discount
    ? service.price - (service.price * service.discount) / 100
    : service.price;

  return (
    <Card variant="elevated" padding="none" hover className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={service.imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'}
          alt={service.name}
          className="w-full h-full object-cover rounded-t-xl"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {service.isPopular && (
            <Badge variant="discount" size="sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {service.discount && (
            <Badge variant="discount" size="sm">
              {service.discount}% OFF
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Text as="h3" variant="h5" className="text-gray-900 line-clamp-2">
              {service.name}
            </Text>
          </div>

          <Text variant="body-sm" className="text-gray-600 line-clamp-2 mb-3">
            {service.description}
          </Text>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Clock className="w-4 h-4" />
            <Text as="span" variant="body-sm">{service.duration} mins</Text>
          </div>

          <div className="flex items-center gap-2">
            {service.discount ? (
              <>
                <Text as="span" variant="h4" weight="bold" className="text-primary-600">
                  {formatCurrency(discountedPrice)}
                </Text>
                <Text as="span" variant="body-sm" className="text-gray-400 line-through">
                  {formatCurrency(service.price)}
                </Text>
              </>
            ) : (
              <Text as="span" variant="h4" weight="bold" className="text-primary-600">
                {formatCurrency(service.price)}
              </Text>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          fullWidth
          size="md"
          onClick={() => onBook?.(service)}
          className="mt-4"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};
