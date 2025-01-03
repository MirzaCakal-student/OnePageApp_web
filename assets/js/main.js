let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => (slide.style.display = "none"));
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
showSlides();

const themeSwitch = document.querySelector("#themeSwitch");
const body = document.body;
themeSwitch.addEventListener("change", () => {
    const isDark = body.classList.contains("dark");
    body.classList.toggle("light", isDark);
    body.classList.toggle("dark", !isDark);
    themeSwitch.nextElementSibling.textContent = isDark
        ? "Light Mode"
        : "Dark Mode";
});

function loadContent() {
    fetch("assets/data/blog.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const contentContainer = document.getElementById("content-container");
            contentContainer.innerHTML = "";
            data.forEach(item => {
                const contentCard = document.createElement("div");
                contentCard.className = "col-md-4 mb-4";
                contentCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.content}</p>
                        </div>
                    </div>
                `;
                contentContainer.appendChild(contentCard);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("content-container").innerHTML = `
                <p class="text-danger text-center">Failed to load content. Please try again later.</p>
            `;
        });
}

function fetchSportsNews() {
    const apiKey = "e4bb142a6d114268a7c55e1a478dfa84";
    const url = `https://newsapi.org/v2/everything?q=gym OR fitness OR sports&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";
            if (data.articles.length === 0) {
                newsContainer.innerHTML =
                    "<p>No news available at the moment. Check back later!</p>";
                return;
            }
            data.articles.slice(0, 6).forEach(article => {
                const newsCard = document.createElement("div");
                newsCard.className = "col-md-4 mb-4";
                newsCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${article.urlToImage || 'default-image.jpg'}" class="card-img-top" alt="News Image">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description || "No description available."}</p>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            document.getElementById("news-container").innerHTML = `
                <p class="text-danger">Failed to load sports news. Please try again later.</p>
            `;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadContent();
    fetchSportsNews();
});
