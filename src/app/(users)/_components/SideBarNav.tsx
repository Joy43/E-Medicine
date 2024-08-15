'use client';

import React, { useState } from 'react';
import { FaHome, FaRegNewspaper, FaRegSquare, FaUser } from 'react-icons/fa';
import { BsCartPlus } from "react-icons/bs";
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
        { id: 2, name: 'Cart', icon: BsCartPlus , path: '/cart' },
        { id: 3, name: 'PaymentStory', icon: FaRegNewspaper, path: '/paymentstory' },
        { id: 4, name: 'Contact', icon: FaRegSquare, path: '/contact' },
        { id: 5, name: 'Home', icon: FaHome, path: '/' },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleNavigation = (path: string, index: number) => {
        setActiveIndex(index);
        router.push(path);
    };

    return (
        <div className="h-full bg-gradient-to-b from-[#0B2C56] to-[#041C32] flex flex-col p-6 overflow-auto shadow-xl">
            {/* Menu */}
            <div className="flex flex-col gap-4 mt-4">
                {menuList.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-3 text-lg rounded-lg p-4 cursor-pointer transition-transform transform ${
                            activeIndex === index
                                ? 'bg-gradient-to-r from-[#674188] to-[#9D3B81] text-white scale-105 shadow-xl'
                                : 'text-zinc-300 hover:bg-[#1A3A5D] hover:text-white hover:scale-105'
                        }`}
                        onClick={() => handleNavigation(item.path, index)}
                    >
                        <item.icon className="text-2xl" />
                        <h2 className="font-medium">{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
