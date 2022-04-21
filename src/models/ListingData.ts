export interface ListingData {
  userRef: string
  type: 'rent' | 'sell'
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
  geolocation: {
    lat: number
    lng: number
  }
  timestamp: Date
}
