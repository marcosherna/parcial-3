import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";


import { database } from "../firebase";

export class FirebaseCrudService {
  constructor(collectionName) {
    this.collectionRef = collection(database, collectionName);
  }

  async create(data) {
    const docRef = await addDoc(this.collectionRef, {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  }

  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  async getById(id) {
    const docRef = doc(this.collectionRef, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }
  async delete(id) {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  async where(field, operator, value) {
    const q = query(this.collectionRef, where(field, operator, value));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async orderBy(field, direction = "asc") {
    const q = query(this.collectionRef, orderBy(field, direction));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  subscribeAll(callback, onError) {
    return onSnapshot(
      this.collectionRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      },
      (error) => {
        if (onError) onError(error);
      }
    );
  }

  subscribeById(id, callback, onError) {
    const docRef = doc(this.collectionRef, id);

    return onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }

        callback({
          id: snapshot.id,
          ...snapshot.data(),
        });
      },
      (error) => {
        if (onError) onError(error);
      }
    );
  }

  subscribeWhere(field, operator, value, callback, onError) {
    const q = query(this.collectionRef, where(field, operator, value));

    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      },
      (error) => {
        if (onError) onError(error);
      }
    );
  }

  subscribeOrderBy(field, direction = "asc", callback, onError) {
    const q = query(this.collectionRef, orderBy(field, direction));

    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      },
      (error) => {
        if (onError) onError(error);
      }
    );
  }
}
