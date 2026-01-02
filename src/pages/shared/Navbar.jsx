import React from 'react'
import { Link } from 'react-router-dom'
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

const Navbar = () => {
    const {user,logOut} = useAuth()
    console.log(user);
    const handleLogout =async () =>{
        await logOut()
        alert("Logout successful!");
    }
   
    return (
        <div className='shadow-md px-4 py-4'>
            <nav className='max-w-7xl mx-auto flex items-center justify-between'>
                {/* logo */}
                <div className='font-bold text-2xl'>
                    <Link to='/'>ForeverHome</Link>
                </div>
                {/* desktop memu */}
                <NavigationMenu clssName='hidden md:flex items-center space-x-4'>
                    <NavigationMenuList>
                        {/* home */}
                        <NavigationMenuItem>
                            <NavigationMenuLink clssName='font-bold'>
                                <Link to='/'>Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        {/* home */}
                        <NavigationMenuItem>
                            <NavigationMenuLink>
                                <Link to="/pet-listing">Pet Listing</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        {/* home */}
                        <NavigationMenuItem>
                            <NavigationMenuLink>
                                <Link to='/donation'>Donation Campaign</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* collor switch and login logout */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <Button variant="outline">
                            <Link to='login'>Login</Link>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent  className="w-40 mt-3">
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                onClick={handleLogout}
                                className="text-red-600">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <div className='flex items-center gap-2'>
                        <Switch />
                        <h1>Dark Mode</h1>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar