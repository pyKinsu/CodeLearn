// lib/userService.ts
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  branch?: string;
  semester?: string;
  rollNum?: string;
  avatarUrl?: string;
  uid: string;
  createdAt?: string;
  updatedAt?: string;
}
export async function createUserProfile(
  uid: string,
  userData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
) {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
