// This file will handle:

// Email/password signup
// Email/password login
// Google redirect login
// Google redirect signup
// Logout
// Detecting the logged-in user
// Handling the Google redirect result
// Redirecting users after authentication

// ========================================
// Authentication
// ========================================

import {
    auth,
    googleProvider
} from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ========================================
// Page Detection
// ========================================

const currentPage =
    window.location.pathname.split("/").pop();


// ========================================
// Elements
// ========================================

const loginForm =
    document.getElementById("login-form");

const signupForm =
    document.getElementById("signup-form");

const googleLoginButton =
    document.getElementById("google-login");

const googleSignupButton =
    document.getElementById("google-signup");


// ========================================
// Messages
// ========================================

const loginError =
    document.getElementById("login-error");

const loginSuccess =
    document.getElementById("login-success");

const signupError =
    document.getElementById("signup-error");

const signupSuccess =
    document.getElementById("signup-success");


// ========================================
// Helper Functions
// ========================================

function showMessage(element, message) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.style.display = "block";
}


function hideMessage(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.style.display = "none";
}


// ========================================
// Firebase Error Messages
// ========================================

function getFirebaseErrorMessage(error) {

    switch (error.code) {

        case "auth/invalid-email":
            return "ইমেইল ঠিকানাটি সঠিক নয়।";

        case "auth/user-not-found":
            return "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।";

        case "auth/wrong-password":
            return "পাসওয়ার্ড সঠিক নয়।";

        case "auth/invalid-credential":
            return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

        case "auth/email-already-in-use":
            return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।";

        case "auth/weak-password":
            return "পাসওয়ার্ড আরও শক্তিশালী করুন।";

        case "auth/network-request-failed":
            return "ইন্টারনেট সংযোগ পরীক্ষা করুন।";

        case "auth/popup-closed-by-user":
            return "Google login বাতিল করা হয়েছে।";

        case "auth/operation-not-allowed":
            return "এই authentication method Firebase-এ চালু করা হয়নি।";

        default:
            console.error(error);

            return "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।";
    }
}


// ========================================
// LOGIN
// ========================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            hideMessage(loginError);
            hideMessage(loginSuccess);


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;


            if (!email || !password) {

                showMessage(
                    loginError,
                    "ইমেইল এবং পাসওয়ার্ড দিন।"
                );

                return;
            }


            const loginButton =
                document.getElementById(
                    "login-button"
                );

            const buttonText =
                document.getElementById(
                    "login-button-text"
                );

            const spinner =
                document.getElementById(
                    "login-spinner"
                );


            try {

                loginButton.disabled = true;

                buttonText.textContent =
                    "লগইন হচ্ছে...";

                spinner.style.display =
                    "block";


                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                showMessage(
                    loginSuccess,
                    "লগইন সফল হয়েছে।"
                );


                window.location.href =
                    "../index.html";


            } catch (error) {

                showMessage(
                    loginError,
                    getFirebaseErrorMessage(error)
                );


                loginButton.disabled = false;

                buttonText.textContent =
                    "লগইন করুন";

                spinner.style.display =
                    "none";
            }

        }
    );

}


// ========================================
// SIGNUP
// ========================================

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            hideMessage(signupError);
            hideMessage(signupSuccess);


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirm-password")
                    .value;

            const terms =
                document
                    .getElementById("terms")
                    .checked;


            // ----------------------------
            // Validation
            // ----------------------------

            if (!name || !email || !password) {

                showMessage(
                    signupError,
                    "সবগুলো ঘর পূরণ করুন।"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    signupError,
                    "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    signupError,
                    "দুটি পাসওয়ার্ড একই নয়।"
                );

                return;
            }


            if (!terms) {

                showMessage(
                    signupError,
                    "ব্যবহারের শর্তাবলিতে সম্মতি দিন।"
                );

                return;
            }


            const signupButton =
                document.getElementById(
                    "signup-button"
                );

            const buttonText =
                document.getElementById(
                    "signup-button-text"
                );

            const spinner =
                document.getElementById(
                    "signup-spinner"
                );


            try {

                signupButton.disabled = true;

                buttonText.textContent =
                    "অ্যাকাউন্ট তৈরি হচ্ছে...";

                spinner.style.display =
                    "block";


                // ----------------------------
                // Create Firebase User
                // ----------------------------

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                // ----------------------------
                // Save Display Name
                // ----------------------------

                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                showMessage(
                    signupSuccess,
                    "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।"
                );


                // ----------------------------
                // Redirect Home
                // ----------------------------

                window.location.href =
                    "../index.html";


            } catch (error) {

                showMessage(
                    signupError,
                    getFirebaseErrorMessage(error)
                );


                signupButton.disabled = false;

                buttonText.textContent =
                    "অ্যাকাউন্ট তৈরি করুন";

                spinner.style.display =
                    "none";
            }

        }
    );

}


// ========================================
// GOOGLE LOGIN
// ========================================

if (googleLoginButton) {

    googleLoginButton.addEventListener(
        "click",
        async () => {

            hideMessage(loginError);
            hideMessage(loginSuccess);


            try {

                googleLoginButton.disabled =
                    true;


                /*
                 * IMPORTANT:
                 *
                 * This is REDIRECT authentication.
                 *
                 * It does NOT open a popup.
                 */

                await signInWithRedirect(
                    auth,
                    googleProvider
                );


            } catch (error) {

                console.error(error);

                googleLoginButton.disabled =
                    false;

                showMessage(
                    loginError,
                    getFirebaseErrorMessage(error)
                );

            }

        }
    );

}


// ========================================
// GOOGLE SIGNUP
// ========================================

if (googleSignupButton) {

    googleSignupButton.addEventListener(
        "click",
        async () => {

            hideMessage(signupError);
            hideMessage(signupSuccess);


            try {

                googleSignupButton.disabled =
                    true;


                /*
                 * Same Google redirect flow.
                 *
                 * Firebase automatically creates
                 * the account if the Google user
                 * doesn't already exist.
                 */

                await signInWithRedirect(
                    auth,
                    googleProvider
                );


            } catch (error) {

                console.error(error);

                googleSignupButton.disabled =
                    false;

                showMessage(
                    signupError,
                    getFirebaseErrorMessage(error)
                );

            }

        }
    );

}


// ========================================
// HANDLE GOOGLE REDIRECT RESULT
// ========================================

async function handleGoogleRedirect() {

    try {

        const result =
            await getRedirectResult(auth);


        if (!result) {
            return;
        }


        const user =
            result.user;


        console.log(
            "Google login successful:",
            user
        );


        /*
         * User is now authenticated.
         *
         * Redirect to home page.
         */

        if (
            currentPage === "login.html" ||
            currentPage === "signup.html"
        ) {

            window.location.href =
                "../index.html";
        }


    } catch (error) {

        console.error(
            "Google redirect error:",
            error
        );


        const errorMessage =
            getFirebaseErrorMessage(error);


        if (currentPage === "login.html") {

            showMessage(
                loginError,
                errorMessage
            );

        }


        if (currentPage === "signup.html") {

            showMessage(
                signupError,
                errorMessage
            );

        }

    }

}


handleGoogleRedirect();


// ========================================
// AUTH STATE
// ========================================

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Logged in user:",
                user.email
            );

        } else {

            console.log(
                "No user is logged in."
            );

        }

    }
);


// ========================================
// LOGOUT FUNCTION
// ========================================

async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "pages/login.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


// Make logout available globally

window.logoutUser = logoutUser;