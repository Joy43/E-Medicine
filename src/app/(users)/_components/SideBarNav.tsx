'use client'

import React, { useState } from 'react';
import { FaHome, FaRegNewspaper, FaRegSquare, FaUser } from 'react-icons/fa';
import { RiLiveFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface MenuItem {
    id: number;
    name: string;
    icon: React.ComponentType;
    path: string;
}

export default function SideBarNav() {
    const router = useRouter();
    const menuList: MenuItem[] = [
        { id: 1, name: 'User Profile', icon: FaUser, path: 'profile' },
        { id: 2, name: 'Cart', icon: RiLiveFill, path: '/cart' },
        { id: 3, name: 'payment', icon: FaRegNewspaper, path: '/payment' },
        { id: 4, name: 'Contact', icon: FaRegSquare, path: '/contact' },
        { id: 5, name: 'Home', icon: FaHome, path: '/' },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleNavigation = (path: string, index: number) => {
        setActiveIndex(index);
        router.push(path);
    };

    return (
        <div className="h-full bg-[#0370F7] flex flex-col p-6 overflow-auto shadow-lg">
            {/* Menu */}
            <div className="flex flex-col gap-4 mt-4">
                {menuList.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-3 text-lg shadow-2xl rounded-md p-4 text-zinc-200 cursor-pointer transition-all duration-300 ${
                            activeIndex === index
                                ? 'bg-[#674188] text-white shadow-xl'
                                : 'hover:bg-[#0370F7] hover:text-white'
                        }`}
                        onClick={() => handleNavigation(item.path, index)}
                    >
                        <item.icon className="text-xl" />
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
