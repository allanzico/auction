export interface Item { }

export interface User {
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  accounts: Account[]
  sessions: Session[]
  Authenticator: Authenticator[]
  auctions: Auction[]
  bids: Bid[]
}

export interface Account {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
  user: User
}

export interface Session {
  sessionToken: string
  userId: string
  expires: Date
  user: User
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date

}

export interface Authenticator {
  credentialID: string
  userId: string
  providerAccountId: string
  credentialPublicKey: string
  counter: number
  credentialDeviceType: string
  credentialBackedUp: Boolean
  transports: string
  user: User
}

export interface Bid {
  amount: number
  userId: string
  lotId: string
  user: User
  lot: Lot
  createdAt?: Date
  updatedAt?: Date
}

export interface Lot {
  id: string
  name: string
  startingBid: number
  file: string
  categoryId: string
  category: LotCategory
  auctionId: string
  auction: Auction
  bids?: Bid[]
  createdAt?: Date
  updatedAt?: Date
}

export interface LotCategory {
  id: string
  name: string
  lots?: Lot[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Auction {
  id: string
  name: string
  file: string
  userId: string
  locationId: string
  location?: Location
  startDate: Date
  endDate: Date
  user?: User
  lots?: Lot[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Location {
  id: string
  country: string
  city: string
  auctions?: Auction[]
  createdAt?: Date
  updatedAt?: Date
}
