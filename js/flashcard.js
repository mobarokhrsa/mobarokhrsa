

        /* -------------------------------
           Vocabulary Data
        -------------------------------- */

        const vocabulary = [

            {
                arabic: "مَرْحَبًا",
                pronunciation: "মারহাবান",
                meaning: "স্বাগতম / হ্যালো",
                arabicExample: "مَرْحَبًا، كَيْفَ حَالُكَ؟",
                banglaExample: "হ্যালো, আপনি কেমন আছেন?"
            },

            {
                arabic: "شُكْرًا",
                pronunciation: "শুকরান",
                meaning: "ধন্যবাদ",
                arabicExample: "شُكْرًا جَزِيلًا",
                banglaExample: "অনেক ধন্যবাদ।"
            },

            {
                arabic: "نَعَمْ",
                pronunciation: "না'আম",
                meaning: "হ্যাঁ",
                arabicExample: "نَعَمْ، أَنَا جَاهِزٌ",
                banglaExample: "হ্যাঁ, আমি প্রস্তুত।"
            },

            {
                arabic: "لَا",
                pronunciation: "লা",
                meaning: "না",
                arabicExample: "لَا، شُكْرًا",
                banglaExample: "না, ধন্যবাদ।"
            },

            {
                arabic: "مَعَ السَّلَامَةِ",
                pronunciation: "মা'আস সালামাহ",
                meaning: "বিদায় / ভালো থাকবেন",
                arabicExample: "مَعَ السَّلَامَةِ، إِلَى اللِّقَاءِ",
                banglaExample: "বিদায়, আবার দেখা হবে।"
            },

            {
                arabic: "صَبَاحُ الْخَيْرِ",
                pronunciation: "সাবাহুল খাইর",
                meaning: "শুভ সকাল",
                arabicExample: "صَبَاحُ الْخَيْرِ يَا صَدِيقِي",
                banglaExample: "শুভ সকাল, বন্ধু।"
            },

            {
                arabic: "مَسَاءُ الْخَيْرِ",
                pronunciation: "মাসাউল খাইর",
                meaning: "শুভ সন্ধ্যা",
                arabicExample: "مَسَاءُ الْخَيْرِ",
                banglaExample: "শুভ সন্ধ্যা।"
            },

            {
                arabic: "مِنْ فَضْلِكَ",
                pronunciation: "মিন ফাদলিকা",
                meaning: "দয়া করে",
                arabicExample: "مِنْ فَضْلِكَ، سَاعِدْنِي",
                banglaExample: "দয়া করে আমাকে সাহায্য করুন।"
            },

            {
                arabic: "آسِفٌ",
                pronunciation: "আসিফুন",
                meaning: "আমি দুঃখিত",
                arabicExample: "آسِفٌ، لَمْ أَفْهَمْ",
                banglaExample: "দুঃখিত, আমি বুঝতে পারিনি।"
            },

            {
                arabic: "كَيْفَ حَالُكَ؟",
                pronunciation: "কাইফা হালুকা?",
                meaning: "আপনি কেমন আছেন?",
                arabicExample: "مَرْحَبًا، كَيْفَ حَالُكَ؟",
                banglaExample: "হ্যালো, আপনি কেমন আছেন?"
            }

        ];


        /* -------------------------------
           Variables
        -------------------------------- */

        let currentIndex = 0;

        let isFlipped = false;

        const flashcard =
            document.getElementById("flashcard");

        const arabicWord =
            document.getElementById("arabicWord");

        const pronunciation =
            document.getElementById("pronunciation");

        const meaning =
            document.getElementById("meaning");

        const arabicExample =
            document.getElementById("arabicExample");

        const banglaExample =
            document.getElementById("banglaExample");

        const progressText =
            document.getElementById("progressText");

        const progressFill =
            document.getElementById("progressFill");


        /* -------------------------------
           Buttons
        -------------------------------- */

        const showAnswer =
            document.getElementById("showAnswer");

        const hideAnswer =
            document.getElementById("hideAnswer");

        const know =
            document.getElementById("know");

        const dontKnow =
            document.getElementById("dontKnow");

        const previousBtn =
            document.getElementById("previousBtn");

        const nextBtn =
            document.getElementById("nextBtn");


        /* -------------------------------
           Load Card
        -------------------------------- */

        function loadCard() {

            const card =
                vocabulary[currentIndex];


            arabicWord.textContent =
                card.arabic;

            pronunciation.textContent =
                card.pronunciation;

            meaning.textContent =
                card.meaning;

            arabicExample.textContent =
                card.arabicExample;

            banglaExample.textContent =
                card.banglaExample;


            progressText.textContent =
                `${currentIndex + 1} / ${vocabulary.length}`;


            const progress =
                ((currentIndex + 1) /
                vocabulary.length) * 100;


            progressFill.style.width =
                `${progress}%`;


            isFlipped = false;

            flashcard.classList.remove("flipped");


            previousBtn.disabled =
                currentIndex === 0;


            nextBtn.disabled =
                currentIndex === vocabulary.length - 1;

        }


        /* -------------------------------
           Flip Card
        -------------------------------- */

        function flipCard() {

            isFlipped = !isFlipped;

            flashcard.classList.toggle(
                "flipped",
                isFlipped
            );

        }


        /* -------------------------------
           Show Answer
        -------------------------------- */

        showAnswer.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                isFlipped = true;

                flashcard.classList.add("flipped");

            }
        );


        /* -------------------------------
           Hide Answer
        -------------------------------- */

        hideAnswer.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                isFlipped = false;

                flashcard.classList.remove("flipped");

            }
        );


        /* -------------------------------
           Card Click
        -------------------------------- */

        flashcard.addEventListener(
            "click",
            function () {

                flipCard();

            }
        );


        /* -------------------------------
           Know Button
        -------------------------------- */

        know.addEventListener(
            "click",
            function () {

                this.classList.add("selected");

                dontKnow.classList.remove(
                    "selected"
                );

                setTimeout(
                    nextCard,
                    250
                );

            }
        );


        /* -------------------------------
           Don't Know Button
        -------------------------------- */

        dontKnow.addEventListener(
            "click",
            function () {

                this.classList.add("selected");

                know.classList.remove(
                    "selected"
                );

                setTimeout(
                    nextCard,
                    250
                );

            }
        );


        /* -------------------------------
           Next Card
        -------------------------------- */

        function nextCard() {

            if (
                currentIndex <
                vocabulary.length - 1
            ) {

                currentIndex++;

                resetAnswerButtons();

                loadCard();

            }

        }


        /* -------------------------------
           Previous Card
        -------------------------------- */

        previousBtn.addEventListener(
            "click",
            function () {

                if (currentIndex > 0) {

                    currentIndex--;

                    resetAnswerButtons();

                    loadCard();

                }

            }
        );


        /* -------------------------------
           Next Button
        -------------------------------- */

        nextBtn.addEventListener(
            "click",
            function () {

                nextCard();

            }
        );


        /* -------------------------------
           Reset Buttons
        -------------------------------- */

        function resetAnswerButtons() {

            know.classList.remove(
                "selected"
            );

            dontKnow.classList.remove(
                "selected"
            );

        }


        /* -------------------------------
           Keyboard Controls
        -------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.code === "Space") {

                    event.preventDefault();

                    flipCard();

                }


                if (event.code === "ArrowRight") {

                    nextCard();

                }


                if (event.code === "ArrowLeft") {

                    if (currentIndex > 0) {

                        currentIndex--;

                        resetAnswerButtons();

                        loadCard();

                    }

                }

            }
        );


        /* -------------------------------
           Start
        -------------------------------- */

        loadCard();

