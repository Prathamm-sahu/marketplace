import { Card, CardContent } from '@/components/ui/card'
import { getAuthSession } from '@/lib/auth'
import { CartItem } from '@/types/cart'
import { User } from '@prisma/client'
import { ShoppingCartIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import CartCard from './CartCard'

interface pageProps {
  
}

const Page: FC<pageProps> = async ({}) => {
  
  const session = await getAuthSession()

  if(!session?.user) {
    return redirect("/sign-in")
  }


  return (
    <>
      <CartCard session={session} />
    </>
  )
}

export default Page