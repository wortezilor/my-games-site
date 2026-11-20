const grid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn[data-genre]");
const sortButtons = document.querySelectorAll(".sort-btn");
const noResults = document.getElementById("noResults");

let currentGenre = "all";
let currentSearch = "";
let currentSort = "default";

function renderGames() {
  let filtered = games.filter(game => {
    const gameGenres = game.genre.toLowerCase().split('/').map(g => g.trim());
    const matchesGenre = currentGenre === "all" || gameGenres.includes(currentGenre.toLowerCase());
    const matchesSearch = game.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (currentSort === "newest") {
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (currentSort === "oldest") {
    filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  grid.innerHTML = filtered.map(game => `
    <a class="game-card" href="game.html?id=${game.id}">
      <div class="card-cover">
        <img src="${game.cover}" alt="${game.title}" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div class="card-body">
        <h3>${game.title}</h3>
        <p class="card-genre">${game.genre}</p>
        <p class="card-desc">${game.shortDescription}</p>
      </div>
    </a>
  `).join("");
}

searchInput.addEventListener("input", (e) => { currentSearch = e.target.value.trim(); renderGames(); });
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentGenre = btn.dataset.genre;
    renderGames();
  });
});
sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sortButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSort = btn.dataset.sort;
    renderGames();
  });
});
renderGames();
