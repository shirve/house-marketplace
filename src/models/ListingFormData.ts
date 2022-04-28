export interface ListingFormData {
  userRef: string
  type: 'rent' | 'sale'
  name: string
  images: FileList
  regularPrice: number
  discountedPrice: number
  offer: boolean
  location: string
  furnished: boolean
  parking: boolean
  bathrooms: number
  bedrooms: number
}