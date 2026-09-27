import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import { db } from "./firebase.js";


async function testFirestore() {

    try {

        const docRef = await addDoc(
            collection(db, "test"),
            {
                message: "Firestore is working!",
                createdAt: new Date()
            }
        );

        console.log("Document created:", docRef.id);

    } catch (error) {

        console.error("Firestore error:", error);

    }
}

testFirestore();