import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";




const categoriesContainer =
    document.getElementById("categories-container");

async function loadCategories() {
    try {
        const categoriesRef = collection(db, "categories");

        const categoriesQuery = query(
            categoriesRef,
            orderBy("order", "asc")
        );

        const snapshot = await getDocs(categoriesQuery);

        categoriesContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const category = doc.data();

            // Create the card INSIDE forEach
            const card = document.createElement("article");

            card.className = "large-category-card";

            card.setAttribute("data-category", doc.id);

            card.innerHTML = `
                <div class="large-category-icon">
                    👋
                </div>

                <div class="category-info">

                    <span class="category-number">
                        ${category.order}
                    </span>

                    <h2>
                        ${category.name}
                    </h2>

                    <p>
                        ${category.description}
                    </p>

                    <div class="category-meta">

                        <span>
                            📚 শব্দ
                        </span>

                        <span>
                            🎯 প্রাথমিক
                        </span>

                    </div>

                </div>

                <a
                    href="flashcards.html?category=${doc.id}"
                    class="category-study">

                    শেখা শুরু করুন →

                </a>
            `;

            // Add the card to the page
            categoriesContainer.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Error loading categories:",
            error
        );

        categoriesContainer.innerHTML = `
            <p>
                বিভাগ লোড করা যায়নি।
                আবার চেষ্টা করুন।
            </p>
        `;
    }
}



loadCategories();










// category search for loaed text in html file
        const searchInput =
            document.getElementById("categorySearch");

        const categoryCards =
            document.querySelectorAll(".large-category-card");

        const noResults =
            document.getElementById("noResults");


        searchInput.addEventListener("input", function () {

            const searchValue =
                this.value.toLowerCase().trim();

            let visibleCards = 0;


            categoryCards.forEach(function (card) {

                const categoryName =
                    card.dataset.category.toLowerCase();

                const cardText =
                    card.innerText.toLowerCase();


                if (
                    categoryName.includes(searchValue) ||
                    cardText.includes(searchValue)
                ) {

                    card.style.display = "grid";
                    visibleCards++;

                } else {

                    card.style.display = "none";

                }

            });


            if (visibleCards === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        });
