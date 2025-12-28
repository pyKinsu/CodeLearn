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

export async function ensureDefaultAvatar(uid: string, firstName: string, lastName: string) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // If no avatar URL exists, generate and save default RoboHash
      if (!userData.avatarUrl) {
        const hashString = `${firstName}${lastName}`.replace(/\s+/g, '') || 'user';
        const roboHashUrl = `https://robohash.org/${hashString}?size=200x200&set=set1`;
        
        await updateDoc(doc(db, 'users', uid), {
          avatarUrl: roboHashUrl,
          updatedAt: new Date().toISOString(),
        });
        
        return roboHashUrl;
      }
      
      return userData.avatarUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error ensuring default avatar:', error);
    return null;
  }
}