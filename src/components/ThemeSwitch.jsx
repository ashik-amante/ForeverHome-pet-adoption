import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"

const ThemeSwitcher = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return (
        <div className='flex items-center gap-2'>
            <Switch
                checked={isDark}
                onCheckedChange={setIsDark}
            />
            <span className='hidden md:block text-sm'>{isDark ? 'Dark' : 'Light'} Mode</span>
        </div>
    )
}

export default ThemeSwitcher
