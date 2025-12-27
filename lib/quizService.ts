// lib/quizService.ts
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

export interface QuizAttempt {
  id?: string;
  userId: string;
  language: string;
  chapterId: string;
  chapterTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  answers: {
    questionId: number;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
  timestamp: Timestamp;
  timeSpent?: number; // in seconds
}

export interface QuizStats {
  totalAttempts: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  averageScore: number;
  languageStats: {
    [language: string]: {
      attempts: number;
      correctAnswers: number;
      wrongAnswers: number;
    };
  };
}

// Save a quiz attempt
export async function saveQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'quizAttempts'), {
      ...attempt,
      timestamp: Timestamp.now(),
    });
    
    // Update user stats
    await updateUserQuizStats(attempt.userId, attempt);
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
    throw error;
  }
}

// Update user quiz statistics
async function updateUserQuizStats(userId: string, attempt: Omit<QuizAttempt, 'id'>) {
  try {
    const userStatsRef = doc(db, 'users', userId);
    const userStatsDoc = await getDoc(userStatsRef);
    
    if (userStatsDoc.exists()) {
      const currentStats = userStatsDoc.data().quizStats || {};
      const languageStats = currentStats.languageStats || {};
      
      // Update language-specific stats
      if (!languageStats[attempt.language]) {
        languageStats[attempt.language] = {
          attempts: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
        };
      }
      
      languageStats[attempt.language].attempts += 1;
      languageStats[attempt.language].correctAnswers += attempt.correctAnswers;
      languageStats[attempt.language].wrongAnswers += attempt.wrongAnswers;
      
      await updateDoc(userStatsRef, {
        'quizStats.totalAttempts': increment(1),
        'quizStats.totalQuestions': increment(attempt.totalQuestions),
        'quizStats.correctAnswers': increment(attempt.correctAnswers),
        'quizStats.wrongAnswers': increment(attempt.wrongAnswers),
        'quizStats.languageStats': languageStats,
      });
    }
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
}

// Get all quiz attempts for a user
export async function getUserQuizAttempts(userId: string): Promise<QuizAttempt[]> {
  try {
    const q = query(
      collection(db, 'quizAttempts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const attempts: QuizAttempt[] = [];
    
    querySnapshot.forEach((doc) => {
      attempts.push({
        id: doc.id,
        ...doc.data(),
      } as QuizAttempt);
    });
    
    return attempts;
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    throw error;
  }
}

// Get quiz attempts for a specific language
export async function getUserQuizAttemptsByLanguage(
  userId: string, 
  language: string
): Promise<QuizAttempt[]> {
  try {
    const q = query(
      collection(db, 'quizAttempts'),
      where('userId', '==', userId),
      where('language', '==', language),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const attempts: QuizAttempt[] = [];
    
    querySnapshot.forEach((doc) => {
      attempts.push({
        id: doc.id,
        ...doc.data(),
      } as QuizAttempt);
    });
    
    return attempts;
  } catch (error) {
    console.error('Error fetching quiz attempts by language:', error);
    throw error;
  }
}

// Get quiz statistics for a user
export async function getUserQuizStats(userId: string): Promise<QuizStats> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.quizStats || {
        totalAttempts: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        averageScore: 0,
        languageStats: {},
      };
    }
    
    return {
      totalAttempts: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      averageScore: 0,
      languageStats: {},
    };
  } catch (error) {
    console.error('Error fetching user quiz stats:', error);
    throw error;
  }
}

// Get attempts for a specific chapter
export async function getChapterAttempts(
  userId: string,
  language: string,
  chapterId: string
): Promise<QuizAttempt[]> {
  try {
    const q = query(
      collection(db, 'quizAttempts'),
      where('userId', '==', userId),
      where('language', '==', language),
      where('chapterId', '==', chapterId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const attempts: QuizAttempt[] = [];
    
    querySnapshot.forEach((doc) => {
      attempts.push({
        id: doc.id,
        ...doc.data(),
      } as QuizAttempt);
    });
    
    return attempts;
  } catch (error) {
    console.error('Error fetching chapter attempts:', error);
    throw error;
  }
}