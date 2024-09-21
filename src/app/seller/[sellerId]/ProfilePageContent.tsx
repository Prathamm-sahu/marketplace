import { User } from '@prisma/client'
import { Session } from 'next-auth'
import { FC } from 'react'
import ProfileDashboard from './ProfileDashboard'
import ProfileData from './ProfileData'

interface ProfilePageContentProps {
  session: Session,
  seller: User
}

const ProfilePageContent: FC<ProfilePageContentProps> = ({ session, seller }) => {
  const userStatus = seller.id === session.user.id ? "seller" : "buyer"

  return (
    <div className="w-full h-full px-4">
      <ProfileDashboard session={session} seller={seller} userStatus={userStatus} />
      <ProfileData seller={seller} userStatus={userStatus} />
    </div>
  )
}

export default ProfilePageContent