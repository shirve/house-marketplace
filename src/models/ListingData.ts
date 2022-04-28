import { FieldValue } from "firebase/firestore"

export interface ListingData {
  [key: string]: any
  userRef: string
  type: 'rent' | 'sale'
  name: string
  images?: FileList
  imageUrls: string[]
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
