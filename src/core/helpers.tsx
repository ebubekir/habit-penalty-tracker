import { FieldValue } from 'firebase/firestore'

import { Timestamp } from 'firebase/firestore'

export function toDate(timestamp: Timestamp | FieldValue): Date {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate()
  }
  return new Date()
}
