"use client"

import { Session } from 'next-auth'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface ProfileProps {
  session: Session
}

const Profile: FC<ProfileProps> = ({ session }) => {

  if(!session.user) {
    return null
  }

  // TODO:- Add more items in drop down
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full outline-none'>
        <Avatar>
          <AvatarImage src={session.user.image || ""} />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={async () => await signOut()}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile