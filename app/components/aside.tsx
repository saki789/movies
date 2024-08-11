import React from 'react';
import Link from 'next/link';

interface LinkItem {
  href: string;
  label: string;
}

const links: LinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/movie', label: 'Movie' },
  { href: '/tv-series', label: 'TV Series' },
  { href: '/sports', label: 'Sports' },
];

const Aside: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 border-r border-gray-200 shadow-md">
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-blue-600 font-medium p-2 rounded hover:bg-gray-200 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Aside;
