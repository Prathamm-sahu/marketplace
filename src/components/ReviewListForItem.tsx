"use client"

import axios from 'axios'
import { Loader } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { ExtendedRating } from '@/types/rating'

interface ReviewListforItemProps {
  itemId: string
}

// TODO: Use react query and add styles
const ReviewListforItem: FC<ReviewListforItemProps> = ({ itemId }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState<ExtendedRating[]>([])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`http://localhost:3000/api/ratings?itemId=${itemId}`)
      setReviews(data || [])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  if(isLoading) {
    return (
      <div>
        <Loader className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  if(reviews.length === 0) {
    return (
      <div>
        No review yet
      </div>
    )
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}

export default ReviewListforItem