import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { Listing } from '../models/Listing'
import { ListingData } from '../models/ListingData'
import ListingItem from '../components/ListingItem'

const Offers = () => {
  const [listings, setListings] = useState<Listing[]>([] as Listing[])
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState<QueryDocumentSnapshot<DocumentData>>()


  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')
        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        let fetchedListings: Listing[] = []
        querySnap.forEach((doc) => {
          return fetchedListings.push({
            id: doc.id,
            data: doc.data() as ListingData,
          })
        })

        setListings(fetchedListings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings()
  }, [])

  // Load more listings
  const loadMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')
      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )
      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      let fetchedListings: Listing[] = []
      querySnap.forEach((doc) => {
        return fetchedListings.push({
          id: doc.id,
          data: doc.data() as ListingData,
        })
      })

      setListings(listings.concat(fetchedListings))
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <p className="loadMore" onClick={loadMoreListings}>Load More</p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers
