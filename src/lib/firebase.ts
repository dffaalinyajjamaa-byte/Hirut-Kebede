import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  signInAnonymously
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  onSnapshot, 
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import { OrderRecord } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');
export const googleProvider = new GoogleAuthProvider();

// Test Firestore Connectivity on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Firestore connected successfully');
    return true;
  } catch (error) {
    console.warn('[Firebase] Firestore test connection notice:', error);
    return false;
  }
}

// Sign in with Google
export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save user profile to Firestore
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Guest VIP',
        photoURL: user.photoURL || '',
        lastLogin: new Date().toISOString()
      }, { merge: true });
    }
    
    return user;
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}

// Guest login fallback if popup is blocked in iframe
export async function loginAsGuest(): Promise<User> {
  const result = await signInAnonymously(auth);
  return result.user;
}

// Logout
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Save an order in Firestore under user document
export async function createOrder(
  userId: string, 
  orderData: Omit<OrderRecord, 'id' | 'userId' | 'createdAt' | 'slaDeadline' | 'status'> & { status?: OrderRecord['status'] }
): Promise<OrderRecord> {
  const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date();
  const slaDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const newOrder: OrderRecord = {
    ...orderData,
    id: orderId,
    userId,
    createdAt: now.toISOString(),
    slaDeadline,
    status: orderData.status || 'pending_verification'
  };

  const orderRef = doc(db, 'users', userId, 'orders', orderId);
  await setDoc(orderRef, newOrder);
  return newOrder;
}

// Subscribe to User Orders
export function subscribeToUserOrders(userId: string, callback: (orders: OrderRecord[]) => void) {
  const ordersCollection = collection(db, 'users', userId, 'orders');
  const q = query(ordersCollection);
  
  return onSnapshot(q, (snapshot) => {
    const orders: OrderRecord[] = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data() as OrderRecord);
    });
    // Sort by createdAt descending
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    callback(orders);
  }, (error) => {
    console.error('Error fetching user orders:', error);
  });
}
