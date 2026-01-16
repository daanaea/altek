export interface Service {
  id: string;
  title: string;
  icon: string;
  subServices: string[];
}

export const services: Service[] = [
  {
    id: 'assembling',
    title: 'Assembling',
    icon: '/images/services/assembling.svg',
    subServices: [
      'Furniture',
      'IKEA',
      'Gazebo',
      'Trampoline',
      'Fitness equipment',
      'Office furniture',
    ],
  },
  {
    id: 'painting',
    title: 'Painting',
    icon: '/images/services/painting.svg',
    subServices: [
      'Interior painting',
      'Exterior painting',
      'Door painting',
      'Trim painting',
      'Fence painting',
      'Baseboard painting',
    ],
  },
  {
    id: 'tv-mounting',
    title: 'TV Mounting',
    icon: '/images/services/tv-mounting.svg',
    subServices: [
      'Residential TV mounting',
      'Commercial TV mounting',
      'Indoor installation',
      'Outdoor installation',
      'Mounting above fireplace',
      'TV brackets',
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: '/images/services/plumbing.svg',
    subServices: [
      'Drain repair and replacement',
      'Water valve repair and replacement',
      'Faucet repair and replacement',
      'Sink repair and replacement',
      'Toilet repair and replacement',
    ],
  },
  {
    id: 'hvac',
    title: 'Air Conditioning & Heating',
    icon: '/images/services/hvac.svg',
    subServices: [
      'Emergency service',
      'System repair',
      'System maintenance',
      'Thermostat repair',
      'Ductwork repair',
      'Air filter cleaning',
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: '/images/services/electrical.svg',
    subServices: [
      'Light switch installation',
      'Outlet installation',
      'Outdoor outlet installation',
      'Lighting control installation',
      'Smart lighting installation',
      'Patio lighting installation',
    ],
  },
  {
    id: 'window-door',
    title: 'Window & Door',
    icon: '/images/services/window-door.svg',
    subServices: [
      'Window screen repair',
      'Screen door repair',
      'Interior door installation',
      'Exterior door installation',
      'Sliding door installation',
    ],
  },
  {
    id: 'flooring',
    title: 'Flooring',
    icon: '/images/services/flooring.svg',
    subServices: [
      'Laminate floor installation',
      'Vinyl flooring installation',
      'Wood floor installation',
    ],
  },
  {
    id: 'drywall',
    title: 'Drywall Repair & Installation',
    icon: '/images/services/drywall.svg',
    subServices: [
      'Drywall repair & patching',
      'Ceiling repair',
      'Taping, mudding & sanding',
      'Texture matching',
      'Basement finishing',
    ],
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    icon: '/images/services/carpentry.svg',
    subServices: [
      'Deck and patio repair & service',
      'Fence installation and repair',
      'Wall installation and repair',
      'Baseboard installation and repair',
      'Siding installation and repair',
    ],
  },
  {
    id: 'general',
    title: 'General Handyman',
    icon: '/images/services/general.svg',
    subServices: [
      'Garage shelving',
      'Closet shelving',
      'Bathroom caulking',
      'Ceiling fan installation and repair',
      'Picture hanging',
      'Shelving installation',
    ],
  },
  {
    id: 'window-tinting',
    title: 'Window Tinting',
    icon: '/images/services/window-tinting.svg',
    subServices: [
      'Residential window tinting',
      'Commercial window tinting',
      'Heat & UV protection films',
      'Privacy window films',
    ],
  },
  {
    id: 'skylight',
    title: 'Skylight Repair & Installation',
    icon: '/images/services/skylight.svg',
    subServices: [
      'Skylight repair',
      'Skylight installation',
      'Skylight replacement',
      'Leak repair',
      'Frame repair',
      'Glass replacement',
    ],
  },
  {
    id: 'roofing',
    title: 'Roofing',
    icon: '/images/services/roofing.svg',
    subServices: [
      'Roof repair',
      'Roof leak repair',
      'Shingle replacement',
      'Gutter repair',
      'Roof inspection',
      'Emergency roof repair',
    ],
  },
];
