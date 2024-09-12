"use client"

import { FC, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ItemType } from '@/lib/validators/item'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface ItemCardProps {
  item: ItemType
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const [isWatched, setIsWatched] = useState(false)

  return (
    <Link href={`/item/${item.ownerId}/${item.id}`}>
      <Card className='hover:scale-105 transform transition duration-300 '>
        <CardHeader className='py-0'>
          <CardTitle>
            {/* Insert the image */}
            <Image src={item.image} alt='ItemImage' width={240} height={240} className="rounded-t-md object-cover w-[240px] h-[240px]" />
          </CardTitle>
        </CardHeader>
        <CardContent className='py-4'>
          <div className='hover:underline text-blue-500 font-medium hover:cursor-pointer'>{item.title}</div>
        </CardContent>
        <CardFooter>
          <div className='flex justify-between items-center w-full gap-2'>
            <p className="text-xl font-medium">${item.price}</p>
            {isWatched ? (
              <Star 
                className='text-blue-500'
                size={24}
                onClick={() => {}}
              />
            ) : (
              <Star
                className='text-gray-500'
                size={24}
                onClick={() => {}}
              />
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ItemCard