import { getAuthSession } from '@/lib/auth'
import axios from 'axios'
import { AlertTriangle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import ProfilePageContent from './ProfilePageContent'
import { db } from '@/lib/db'

interface pageProps {
  params: {
    sellerId: string
  }
}

const page: FC<pageProps> = async ({ params }) => {

  const session = await getAuthSession()
  const seller = await db.user.findFirst({
    where: {
      id: params.sellerId
    }
  })

  if(!session) {
    return redirect("/sign-in")
  }

  if(!seller) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertTriangle className="w-16 h-16 text-yellow-400" />
        <span>Seller not found</span>
      </div>
    )
  }

  return (
    <div>
      <ProfilePageContent session={session} seller={seller} />
    </div>
  )
}

export default page