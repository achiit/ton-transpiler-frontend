// src/components/Navbar/Navbar.tsx
import React from 'react';
import './Navbar.css';

interface NavbarProps {
    children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <nav className="navbar">
            {children}
        </nav>
    );
};