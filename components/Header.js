import React from 'react'
import Image from 'next/image'
import HeaderIcon from './HeaderIcon';
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    UserGroupIcon,
    ViewGridIcon,
    HomeIcon
} from "@heroicons/react/solid";
import {
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from 'next-auth/react';


function Header() {
    const { data: session, status } = useSession();
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
        <div className='flex items-center'>
            <Image src="https://links.papareact.com/5me" alt="fblogo" width={40} height={40} layout='fixed'/>
            <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
                <SearchIcon className='h-6 text-gray-600'/>
                <input className='hidden md:inline-flex ml-2 items-center bg-transparent placeholder-gray-500 outline-none flex-shrink' type="text" placeholder='Search Facebook'/>
            </div>
        </div>
        <div className='flex justify-center flex-grow'>
            <div className='flex md:space-x-6 space-x-2'>
                <HeaderIcon active={true} Icon={HomeIcon}/>
                <HeaderIcon Icon={FlagIcon}/>
                <HeaderIcon Icon={PlayIcon}/>
                <HeaderIcon Icon={ShoppingCartIcon}/>
                <HeaderIcon Icon={UserGroupIcon}/>
            </div>
        </div>

        <div className='flex items-center sm:space-x-2 justify-end'>
            {/* profile pic */}
            <Image 
                onClick={signOut}
                className="rounded-full cursor-pointer"
                src={session.user.image}
                width="40"
                height="40"
                alt="meImage"
                layout='fixed'
            />
            <p className='whitespace-nowrap font-semibold pr-3'>{session.user.name}</p>
            <ViewGridIcon className='icon' />
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <ChevronDownIcon className='icon' />
        </div>
        
    </div>
  )
}

export default Header
