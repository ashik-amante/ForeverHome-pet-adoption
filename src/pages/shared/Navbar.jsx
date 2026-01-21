import React, { useState } from 'react'
import { Link,} from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import useAuth from '@/hooks/useAuth'
import { Cross, Menu, X } from 'lucide-react'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = async () => {
        await logOut()
        toast.success('Logout successful!')
    }

    return (
        <div className='shadow-md px-4 py-4 fixed top-0 left-0 right-0 z-50 bg-background'>
            <nav className='max-w-7xl mx-auto flex items-center justify-between'>
                {/* Logo */}
                <div className='font-bold text-2xl'>
                    <Link to='/'>
                        <span className="bg-gradient-to-r from-rose-400 via-gray-700 to-rose-600 text-transparent bg-clip-text">
                            ForeverHome
                        </span>
                    </Link>
                </div>


                {/* Desktop Menu */}
                <div className='hidden md:flex items-center space-x-4'>
                    <NavigationMenu>
                        <NavigationMenuList className='flex space-x-4'>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link to='/'>Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link to="/pet-listing">Pet Listing</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link to='/donation'>Donation Campaign</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile & Desktop Right Side */}
                <div className='flex items-center gap-4'>
                    {/*  Avatar & Login */}
                    {!user ? (
                        <Button variant="outline" className='hidden md:block'>
                            <Link to='login'>Login</Link>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user.photoURL} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-40 mt-3">
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/user-stats">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Theme Switch
                    <div className='flex items-center gap-2'>
                        <Switch />
                        <h1 className='hidden md:block'></h1>
                    </div> */}

                    {/* Mobile Hamburger */}
                    <div className='md:hidden '>
                        <Button
                            variant="outline"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div className="fixed top-16 right-4 z-50 w-56 rounded-xl bg-background shadow-2xl p-4 space-y-2 transform transition-all duration-300 ease-out translate-y-0 opacity-100 ">
                        <Link onClick={() => setMenuOpen(false)} to='/' className='block py-2'>Home</Link>
                        <Link onClick={() => setMenuOpen(false)} to='/pet-listing' className='block py-2'>Pet Listing</Link>
                        <Link onClick={() => setMenuOpen(false)} to='/donation' className='block py-2'>Donation Campaign</Link>
                        {!user ? (
                            <Link to='/login' className='block py-2'>Login</Link>
                        ) : (
                            <>
                                <Link to='/dashboard/user-stats' className='block py-2'>Dashboard</Link>
                                <button
                                    onClick={handleLogout}
                                    className='block py-2 text-red-600 w-full text-left'
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar
