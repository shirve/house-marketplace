import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { ListingData } from '../models/ListingData'

interface Props {
  listing: ListingData
  id: string
  onDelete?: (id: string, name: string) => void
}

const ListingItem = ({ listing, id, onDelete }: Props) => {
  return (
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

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76, 60)'
          onClick={() => onDelete(id, listing.name)}
        />
      )}
    </li>
  )
}

export default ListingItem
