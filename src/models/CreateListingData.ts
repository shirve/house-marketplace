import { FieldValue } from 'firebase/firestore'

export interface CreateListingData {
  userRef: string
  type: 'rent' | 'sale'
  name: string
  images?: FileList
  imageUrls: void | string[]
  regularPrice: number
  discountedPrice: number
  offer: boolean
  location: string
  furnished: boolean
  parking: boolean
  bathrooms: number
  bedrooms: number
  timestamp: FieldValue
}
