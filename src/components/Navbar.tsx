'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Bell, Briefcase, DollarSign,  } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession, signOut} from 'next-auth/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PricingDetails } from './priceCard';


interface Notification {
  id: number;
  text: string;
  isNew: boolean;
}


const Navbar = () => {
  const router = useRouter();
  const {status , data: session} = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications] = useState<Notification[]>([
    { id: 1, text: "New job match: Senior Developer", isNew: true },
    { id: 2, text: "Interview scheduled tomorrow", isNew: true },
  ]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement banner */}
      <div className={`bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 text-center text-sm transition-all duration-300 ${
        isScrolled ? 'transform -translate-y-full h-0 opacity-0' : ''
      }`}>
        🎉 New Notification Available 
      </div>

      <nav className={`bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
                <span className="text-4xl  md:text-7xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-transparent bg-clip-text">
                  upDate
                </span>
              </Link>
            </div>
            <div className='flex items-center md:space-x-4'>
            <div className='flex items-center '>
            <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
                <DialogTrigger asChild>
                  <button
                    className="py-4 px-2  text-gray-800 hover:text-red-500 rounded transition duration-300 focus:outline-none flex items-center space-x-1 group"
                    onMouseEnter={() => setIsOpen(true)}
                  >
                    <DollarSign className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Pricing</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-11/12 bg-gray-100" onPointerDownOutside={() => setIsOpen2(false)}>
                  <DialogTitle className="
                    text-lg md:text-2xl text-black font-bold">
                    Pricing Details
                  </DialogTitle>
                  <PricingDetails />
                </DialogContent>

              </Dialog>
            </div>
            <div className="flex items-center md:hidden">
            {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={session?.user?.image || undefined} 
                      alt={session?.user?.name || "User avatar"}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className='bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300' onClick={()=> {router.push("/SignUp/phoneNumber")}}>Sign In</Button>
          )}
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
            {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button
                    className="py-4 px-2 hover:bg-gray-500 rounded transition duration-300 focus:outline-none"
                    onMouseEnter={() => setIsOpen(true)}
                  >Pricing
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-11/12 bg-gray-100" onPointerDownOutside={() => setIsOpen(false)}>
                  <DialogTitle className="
                    text-lg md:text-2xl text-black font-bold">
                    Pricing Details
                  </DialogTitle>
                  <PricingDetails />
                </DialogContent>

              </Dialog>
              <Link href="/contact" className="py-4 px-2  rounded transition duration-300">
                Contact
              </Link> */}
            {/* Search bar */}
            {/* <div className="relative group">
                <div className="flex items-center bg-gray-50 rounded-full px-6 py-2 space-x-4 border focus-within:border-red-500 transition-all duration-300">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    className="w-64 bg-transparent focus:outline-none"
                  />
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="relative">
                    <button 
                      className="flex items-center space-x-2 text-gray-600"
                      onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Location</span>
                    </button>
                    
                    {showLocationDropdown && (
                      <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg py-2 w-48 border">
                        {locations.map((location) => (
                          <button
                            key={location}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div> */}

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              <Link href="/job" className="flex items-center space-x-1 text-gray-700 hover:text-red-600 group">
                <Briefcase className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Jobs</span>
              </Link>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                 onClick={() => router.push('/notifaction')} 
                className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="h-6 w-6 text-gray-700" />
                  {notifications.some(n => n.isNew) && (
                    <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={session?.user?.image || undefined} 
                      alt={session?.user?.name || "User avatar"}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className='bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300' onClick={()=> {router.push("/SignUp/phoneNumber")}}>Sign In</Button>
          )}
            </div>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* <div className="relative">
                <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 space-x-2 border">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div> */}

              <Link href="/job" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Briefcase className="h-5 w-5" />
                <span>Jobs</span>
              </Link>
              <button 
              onClick={() => router.push('/notifaction')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg w-full">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
                {notifications.some(n => n.isNew) && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      </nav>
    </div>
  );
};

export default Navbar;

