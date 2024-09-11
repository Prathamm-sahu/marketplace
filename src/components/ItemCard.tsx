"use client"

import { FC, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ItemType } from '@/lib/validators/item'
import { Star } from 'lucide-react'

interface ItemCardProps {
  item: ItemType
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const [isWatched, setIsWatched] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {/* Insert the image */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>{item.title}</div>
        </CardContent>
        <CardFooter>
          <div>
            <p>${item.price}</p>
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
    </>
  )
}

export default ItemCard