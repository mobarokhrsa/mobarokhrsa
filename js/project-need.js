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