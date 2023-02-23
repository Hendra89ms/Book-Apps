import { db } from '../firebase_config'
import { getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, doc, where, query, getCountFromServer } from 'firebase/firestore'

let bookCollectionRef = collection(db, "book")

export default class Book_Services {

    static addBook = (newBook) => {
        return addDoc(bookCollectionRef, newBook)
    }

    static getAllBook = () => {
        return getDocs(bookCollectionRef)
    }

    static getBook = (id) => {
        const bookDoc = doc(db, "book", id)
        return getDoc(bookDoc)
    }

    static updateBook = (id, updateData) => {
        const bookDoc = doc(db, "book", id)
        return updateDoc(bookDoc, updateData)
    }

    static deleteBook = (id) => {
        const bookDoc = doc(db, "book", id)
        return deleteDoc(bookDoc)
    }

    static totalData = (userId) => {
        const q = query(bookCollectionRef, where("userId", "==", userId));
        return getCountFromServer(q)
    }

    static dataUser = (userId) => {
        const q = query(bookCollectionRef, where("userId", "==", userId));
        return getDocs(q)
    }


}