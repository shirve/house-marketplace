export interface ListingData {
  userRef: string
  type: 'rent' | 'sale'
  name: string
  imageUrls: string[]
  regularPrice: number
  discountedPrice: number
  offer: boolean
  location: string
  furnished: boolean
  parking: boolean
  bathrooms: number
  bedrooms: number
  timestamp: Date
}
