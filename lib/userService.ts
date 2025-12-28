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
  
  // Social Media
  github?: string;
  linkedin?: string;
  instagram?: string;
  reddit?: string;
  discord?: string;
  
  // Streak
  streak?: number;
  lastLoginDate?: string;
}

export async function createUserProfile(
  uid: string,
  userData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt' | 'streak' | 'lastLoginDate'>
) {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      uid,
      github: userData.github || '',
      linkedin: userData.linkedin || '',
      instagram: userData.instagram || '',
      reddit: userData.reddit || '',
      discord: userData.discord || '',
      streak: 0,
      lastLoginDate: new Date().toISOString(),
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
