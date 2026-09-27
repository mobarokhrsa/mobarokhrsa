<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBPsrXsSdo1x-J-8aAi83WTM0LiE7TMle0",
    authDomain: "arabic-learning-app-789bd.firebaseapp.com",
    projectId: "arabic-learning-app-789bd",
    storageBucket: "arabic-learning-app-789bd.firebasestorage.app",
    messagingSenderId: "830179046365",
    appId: "1:830179046365:web:c566fea21ee0abb6e03c34",
    measurementId: "G-7RGHQNEPB9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>




Public-facing name for project: project-830179046365



 <script>

        /*
         * Password visibility
         */

        const passwordInput =
            document.getElementById("password");

        const confirmPasswordInput =
            document.getElementById("confirm-password");

        const togglePassword =
            document.getElementById("toggle-password");

        const toggleConfirmPassword =
            document.getElementById(
                "toggle-confirm-password"
            );


        togglePassword.addEventListener("click", () => {

            const isPassword =
                passwordInput.type === "password";

            passwordInput.type =
                isPassword ? "text" : "password";

            togglePassword.textContent =
                isPassword ? "🙈" : "👁";

        });


        toggleConfirmPassword.addEventListener(
            "click",
            () => {

                const isPassword =
                    confirmPasswordInput.type === "password";

                confirmPasswordInput.type =
                    isPassword ? "text" : "password";

                toggleConfirmPassword.textContent =
                    isPassword ? "🙈" : "👁";

            }
        );


        /*
         * Form handling
         *
         * Firebase Authentication will be
         * connected here later.
         */

        const signupForm =
            document.getElementById("signup-form");

        const signupError =
            document.getElementById("signup-error");

        const signupSuccess =
            document.getElementById("signup-success");


        signupForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                signupError.style.display = "none";
                signupSuccess.style.display = "none";


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
                    passwordInput.value;

                const confirmPassword =
                    confirmPasswordInput.value;

                const terms =
                    document.getElementById("terms").checked;


                /*
                 * Basic validation
                 */

                if (!name || !email || !password) {

                    signupError.textContent =
                        "সবগুলো ঘর পূরণ করুন।";

                    signupError.style.display =
                        "block";

                    return;
                }


                if (password.length < 6) {

                    signupError.textContent =
                        "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";

                    signupError.style.display =
                        "block";

                    return;
                }


                if (password !== confirmPassword) {

                    signupError.textContent =
                        "দুটি পাসওয়ার্ড একই নয়।";

                    signupError.style.display =
                        "block";

                    return;
                }


                if (!terms) {

                    signupError.textContent =
                        "ব্যবহারের শর্তাবলিতে সম্মতি দিন।";

                    signupError.style.display =
                        "block";

                    return;
                }


                /*
                 * Firebase signup will be
                 * added here.
                 */

                signupSuccess.textContent =
                    "Firebase যুক্ত করার পর এখানে আপনার অ্যাকাউন্ট তৈরি হবে।";

                signupSuccess.style.display =
                    "block";

            }
        );


        /*
         * Google Signup
         */

        document
            .getElementById("google-signup")
            .addEventListener("click", () => {

                alert(
                    "Firebase Authentication যুক্ত করার পর Google দিয়ে অ্যাকাউন্ট তৈরি করা যাবে।"
                );

            });

    </script>



    // js/auth.js

// This file will handle:

// Signup
// Email/password login
// Google login
// Logout
// Authentication state
// Error messages
// Redirecting users


// ========================================
// Firebase Authentication
// ========================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// Import Firebase Auth instance

import { auth } from "./firebase.js";


// ========================================
// Helper Functions
// ========================================

function showError(element, message) {

    if (!element) return;

    element.textContent = message;
    element.style.display = "block";
}


function showSuccess(element, message) {

    if (!element) return;

    element.textContent = message;
    element.style.display = "block";
}


function hideMessage(element) {

    if (!element) return;

    element.style.display = "none";
}


// ========================================
// Firebase Error Messages
// ========================================

function getAuthErrorMessage(errorCode) {

    switch (errorCode) {

        case "auth/email-already-in-use":
            return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।";

        case "auth/invalid-email":
            return "ইমেইল ঠিকানাটি সঠিক নয়।";

        case "auth/weak-password":
            return "পাসওয়ার্ড আরও শক্তিশালী করুন।";

        case "auth/user-not-found":
            return "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।";

        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

        case "auth/popup-closed-by-user":
            return "Google login window বন্ধ করা হয়েছে।";

        case "auth/popup-blocked":
            return "আপনার ব্রাউজার popup বন্ধ করে দিয়েছে।";

        case "auth/network-request-failed":
            return "ইন্টারনেট সংযোগ পরীক্ষা করুন।";

        default:
            return "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।";
    }
}


// ========================================
// SIGN UP
// ========================================

const signupForm =
    document.getElementById("signup-form");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


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


            const errorElement =
                document.getElementById(
                    "signup-error"
                );


            const successElement =
                document.getElementById(
                    "signup-success"
                );


            hideMessage(errorElement);
            hideMessage(successElement);


            // Validate name

            if (!name) {

                showError(
                    errorElement,
                    "আপনার নাম লিখুন।"
                );

                return;
            }


            // Validate password

            if (password.length < 6) {

                showError(
                    errorElement,
                    "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
                );

                return;
            }


            // Confirm password

            if (password !== confirmPassword) {

                showError(
                    errorElement,
                    "দুটি পাসওয়ার্ড একই নয়।"
                );

                return;
            }


            try {

                // Create Firebase user

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                // Save display name

                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                showSuccess(
                    successElement,
                    "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!"
                );


                // Redirect to home

                setTimeout(() => {

                    window.location.href =
                        "../index.html";

                }, 1200);


            } catch (error) {

                console.error(error);

                showError(
                    errorElement,
                    getAuthErrorMessage(error.code)
                );

            }

        }
    );

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const errorElement =
                document.getElementById(
                    "login-error"
                );


            const successElement =
                document.getElementById(
                    "login-success"
                );


            hideMessage(errorElement);
            hideMessage(successElement);


            if (!email || !password) {

                showError(
                    errorElement,
                    "ইমেইল এবং পাসওয়ার্ড দিন।"
                );

                return;
            }


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                showSuccess(
                    successElement,
                    "লগইন সফল হয়েছে!"
                );


                // Redirect home

                setTimeout(() => {

                    window.location.href =
                        "../index.html";

                }, 700);


            } catch (error) {

                console.error(error);

                showError(
                    errorElement,
                    getAuthErrorMessage(error.code)
                );

            }

        }
    );

}


// ========================================
// GOOGLE LOGIN / SIGNUP
// ========================================

const googleLoginButton =
    document.getElementById("google-login");


const googleSignupButton =
    document.getElementById("google-signup");


async function loginWithGoogle() {

    const provider =
        new GoogleAuthProvider();


    try {

        await signInWithPopup(
            auth,
            provider
        );


        // Google authentication succeeded

        window.location.href =
            "../index.html";


    } catch (error) {

        console.error(error);


        const errorElement =
            document.getElementById(
                "login-error"
            );


        const signupErrorElement =
            document.getElementById(
                "signup-error"
            );


        const message =
            getAuthErrorMessage(error.code);


        if (errorElement) {

            showError(
                errorElement,
                message
            );

        }


        if (signupErrorElement) {

            showError(
                signupErrorElement,
                message
            );

        }

    }

}


// Login page Google button

if (googleLoginButton) {

    googleLoginButton.addEventListener(
        "click",
        loginWithGoogle
    );

}


// Signup page Google button

if (googleSignupButton) {

    googleSignupButton.addEventListener(
        "click",
        loginWithGoogle
    );

}


// ========================================
// FORGOT PASSWORD
// ========================================

const forgotPassword =
    document.getElementById(
        "forgot-password"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const errorElement =
                document.getElementById(
                    "login-error"
                );


            const successElement =
                document.getElementById(
                    "login-success"
                );


            hideMessage(errorElement);
            hideMessage(successElement);


            if (!email) {

                showError(
                    errorElement,
                    "প্রথমে আপনার ইমেইল লিখুন।"
                );

                return;
            }


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                showSuccess(
                    successElement,
                    "পাসওয়ার্ড পরিবর্তনের লিংক আপনার ইমেইলে পাঠানো হয়েছে।"
                );


            } catch (error) {

                console.error(error);

                showError(
                    errorElement,
                    getAuthErrorMessage(error.code)
                );

            }

        }
    );

}


// ========================================
// AUTH STATE
// ========================================

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Logged in user:",
                user.uid
            );

            console.log(
                "Email:",
                user.email
            );

            console.log(
                "Name:",
                user.displayName
            );

        } else {

            console.log(
                "No user is currently logged in."
            );

        }

    }
);


// ========================================
// LOGOUT FUNCTION
// ========================================

export async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "login.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}
