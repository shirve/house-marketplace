import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { Listing } from '../models/Listing'
import { ListingData } from '../models/ListingData'
import ListingItem from '../components/ListingItem'

const Profile = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<Listing[]>([] as Listing[])
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('userRef', '==', auth.currentUser?.uid), orderBy('timestamp', 'desc'))
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
    fetchUserListings()
  }, [auth.currentUser?.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (listingId: string, listingName: string) => {
    if (window.confirm(`Are you sure you want to delete listing: ${listingName}?`)) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updatedListings)
    }
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        // Update in firebase
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'Done' : 'Edit'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name!}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email!}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your place</p>
          <img src={arrowRight} alt='arrowRight' />
        </Link>
        {!loading && listings.length > 0 && (
          <React.Fragment>
            <p className="listingText">Your listings</p>
            <ul className="listingsList">
              {listings.map(listing => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id, listing.data.name)} />
              ))}
            </ul>
          </React.Fragment>
        )}
      </main>
    </div>
  )
}

export default Profile
