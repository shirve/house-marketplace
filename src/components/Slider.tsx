import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Spinner from './Spinner'
import { Listing } from '../models/Listing'
import { ListingData } from '../models/ListingData'

const Slider = () => {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<Listing[] | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10))
      const querySnap = await getDocs(q)

      let listings: Listing[] = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data() as ListingData,
        })
      })

      setListings(listings)
      setLoading(false)
    }
    getListings()
  }, [])

  if (loading) return <Spinner />

  return (
    listings && (
      <>
        <p className='exploreHeading'>Latest</p>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {listings.map(({ id, data }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div className='swiperSlideDiv'>
                <img
                  src={data.imageUrls[0]}
                  alt='img'
                  className='swiperSlideImg'
                />
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  $&nbsp;{data.discountedPrice ? data.discountedPrice : data.regularPrice}
                  {data.type === 'rent' && ' / month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
