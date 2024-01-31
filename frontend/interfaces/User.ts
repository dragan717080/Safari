export interface UserInfo {
  readonly displayName: string | null
  readonly email: string | null
  readonly phoneNumber: string | null
  readonly photoURL: string | null
  readonly providerId: string
  readonly uid: string
}

export interface UserMetadata {
  readonly createdAt: string
  readonly lastLoginAt: string
  readonly creationTime: string
  readonly lastSignInTime: string
}

export interface User {
  accessToken?: string
  uid: string
  email?: string
  displayName?: string
  /* If needed also add providerId, phoneNumber and photoURL
  from providerData[0] */
}

export interface AuthUser extends User {
  readonly providerId: string
  metadata?: UserMetadata
}
