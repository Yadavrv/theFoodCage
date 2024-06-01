import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Registers a new user with email and password, and stores user information in Firestore
  async registerUser(email: string, password: string, name: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        const userRef = this.firestore.collection('users').doc(credential.user.uid);
        const data = { email, name: name || 'Unknown' };
        await userRef.set(data);
      } else {
        throw new Error('User not found in credential.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Logs in a user with email and password
  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logs out the current user
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Retrieves the currently logged-in user
  async getCurrentUser(): Promise<firebase.User | null> {
    try {
      return this.afAuth.currentUser;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  // Fetches user data from Firestore by user ID
  async getUserData(uid: string): Promise<any> {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      return userDoc?.data();
    } catch (error) {
      console.error('Error getting user data from Firestore:', error);
      throw error;
    }
  }

  // Retrieves all users from Firestore as an observable
  getAllUsers(): Observable<any[]> {
    try {
      return this.firestore.collection('users').valueChanges({ idField: 'id' });
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  // Logs in a staff member with staff ID and password
  async staffLogin(staffId: string, password: string): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(staffId, password);
    } catch (error) {
      console.error('Staff login error:', error);
      return null;
    }
  }

  // Retrieves the current user's UID
  async getCurrentUserId(): Promise<string | null> {
    try {
      const user = await this.getCurrentUser();
      return user ? user.uid : null;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      throw error;
    }
  }
}
