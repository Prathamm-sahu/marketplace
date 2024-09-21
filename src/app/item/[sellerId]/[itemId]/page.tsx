import { db } from '@/lib/db'
import axios from 'axios'
import { AlertTriangle, Star } from 'lucide-react'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RatingType } from '@/lib/validators/rating'
import ReviewListforItem from '@/components/ReviewListForItem'
import PurchaseSection from './PurchaseSection'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

interface pageProps {
  params: {
    sellerId: string,
    itemId: string
  }
}

//  TODO: Implement error handling and proper loading states
const page: FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession()

  const { data: item } = await axios.get(`http://localhost:3000/api/items/${params.itemId}`)

  // console.log(item)
  const seller = await db.user.findFirst({
    where: {
      id: params.sellerId
    }
  })

  const calculateAverageStars = () => {
    let totalStars = 0;
    item.ratings?.map((rating: RatingType) => {
      totalStars += rating.stars
    }) 

    const avgStars = totalStars/item.ratings?.length

    return avgStars;
  }

  const avgstars = calculateAverageStars()

  if(!session?.user) {
    return redirect("/sign-in")
  }
   
  if(!item) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-96">
        <AlertTriangle className="w-16 h-16 text-yellow-400" />
        <span className="text-xl">No listings found</span>
      </div>
    )
  }

  return (
    <div className='flex gap-6 items-start w-full p-6 bg-white text-black'>
      <div className='w-3/12 sticky top-6'>
        <Image
          src={item.image}
          alt="Img"
          className='w-full'
          width={500}
          height={500}
        />
      </div>

      <div className='flex flex-col gap-3 w-6/12'>
        <p className='text-2xl font-bold'>{item.title}</p>
        <Link href={`/seller/${seller?.id}`} className='text-blue-500 hover:underline'>
          {`Visit ${seller?.name}'s Store`}
        </Link>
        <div className="flex items-center gap-3">
          {item.ratings?.length === 0 ? (
            <span className="w-full text-sm">No reviews yet</span>
          ) : (
            <div className="w-full text-md flex gap-2 items-center">
              <div className="text-md flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={cn("text-orange-500", i <= Math.round(avgstars) && "text-orange-500 fill-orange-500")}
                  />
                ))}
              </div>
              <span>{item.ratings?.length} ratings</span>
            </div>
          )}
        </div>

        <p className='text-3xl font-semibold'>${item.price}</p>
        <div className='border-t border-black/25 pt-3'>
          <p className='text-lg font-semibold'>Product description</p>
          <p className='pl-3 pt-3'>{item.description}</p>
        </div>

        <div className="flex flex-col border-t border-black/25 pt-3 gap-3">
          <p className="text-lg font-semibold">Customer reviews</p>
          {/*TODO: Review List */}
          <ReviewListforItem itemId={item.id} />
        </div>
      </div>

      {/* TODO: PurchaseSection */}
      <PurchaseSection 
        {...item}
        session={session}
      />
    </div>
  )
}

export default page