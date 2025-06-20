document.addEventListener("DOMContentLoaded", () => {
  fetch("movies.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch movies.json");
      return response.json();
    })
    .then(movies => {
      const container = document.getElementById("movies-container");

      movies.forEach(movie => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="card">
            <img src="${movie.poster}" alt="${movie.title} Poster">
            <div class="card-content">
              <h3>${movie.title} (${movie.year})</h3>
              <a href="${movie.youtube_trailer}" target="_blank">▶ Watch Trailer</a>
            </div>
          </div>
        `;
        container.appendChild(slide);
      });

      new Swiper(".swiper", {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween:5 },
          600: { slidesPerView: 2, spaceBetween: 8 },
          900: { slidesPerView: 3, spaceBetween: 10},
          1200: { slidesPerView: 3, spaceBetween: 10}
        }
      });
    })
    .catch(error => {
      console.error("Error loading movies:", error);
      document.getElementById("movies-container").innerHTML = `<p style="color:red;">Failed to load movies.</p>`;
    });
});