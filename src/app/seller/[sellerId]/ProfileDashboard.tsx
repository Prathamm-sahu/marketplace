import { User } from '@prisma/client'
import { Session } from 'next-auth'
import { FC } from 'react'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface ProfileDashboardProps {
  session: Session,
  seller: User,
  userStatus: "seller" | "buyer"
}

const ProfileDashboard: FC<ProfileDashboardProps> = ({ session, seller, userStatus }) => {
  return (
    <div className='flex justify-center items-center gap-8 mt-8'>
      {seller.image !== "" ? (
        <Image
          src={seller.image || ""}
          alt=""
          width={150}
          height={150}
          className="rounded-full max-w-[150px] max-h-[150px]"
        />
      ) : (
        <div className="rounded-full w-[150px] h-[150px] bg-yellow-500"></div>
      )}

      <div className="flex flex-col items-center gap-2 py-2">
        <span className="font-semibold self-start">{seller.name}</span>
        {/* sellerstats */}
        {seller.bio !== "" && (
          <ScrollArea className="h-[150px] w-[500px] rounded-md border p-4">
            {seller.bio}
          </ScrollArea>
        )}
        {userStatus === "seller" && (
          <Button variant="outline" className="text-xs">
            <Pencil className="inline-block w-[12px] h-[12px] mr-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileDashboard