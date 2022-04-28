import { Link } from 'react-router-dom'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { ListingData } from '../models/ListingData'
import React from 'react'

interface Props {
  listing: ListingData
  id: string
  onEdit?: (id: string) => void
  onDelete?: (id: string, name: string) => void
}

const ListingItem = ({ listing, id, onEdit, onDelete }: Props) => {
  return (
    <React.Fragment>
      <li className='categoryListing'>
        <Link
          to={`/category/${listing.type}/${id}`}
          className='categoryListingLink'
        >
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className='categoryListingImg'
          />
          <div className='categoryListingDetails'>
            <p className='categoryListingLocation'>{listing.location}</p>
            <p className='categoryListingName'>{listing.name}</p>
            <p className='categoryListingPrice'>
              $&#8203;
              {listing.offer ? listing.discountedPrice : listing.regularPrice}
              {listing.type === 'rent' && ' / month'}
            </p>
            <div className='categoryListingInfoDiv'>
              <img src={bedIcon} alt='bed' />
              <p className='categoryListingInfoText'>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} bedrooms`
                  : '1 bedroom'}
              </p>
              <img src={bathtubIcon} alt='bathtub' />
              <p className='categoryListingInfoText'>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : '1 bathroom'}
              </p>
            </div>
          </div>
        </Link>
      </li>
      {onDelete && (
        <button
          type='button'
          className='deleteButton'
          onClick={() => onDelete(id, listing.name)}
        >
          Delete listing
        </button>
      )}
      {onEdit && (
        <button
          type='button'
          className='editButton'
          onClick={() => onEdit(id)}
        >
          Edit listing
        </button>
      )}
    </React.Fragment>
  )
}

export default ListingItem
