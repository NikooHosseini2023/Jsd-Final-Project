//character of harry potter
console.log(axios);
const searchform = document.querySelector("#searchform");
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const charactersList = document.querySelector("#charactersList");
const characterDetails = document.querySelector("#characterDetails");

searchform.addEventListener("submit", function (ev) {
  ev.preventDefault(); // Don't reload the page!
  // ev.stopPropagation();
  console.log("user input:", searchInput.value);

  const url = `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchInput.value}`;
  charactersList.style.display = "block";
  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      charactersList.innerHTML = "";
      for (const result of response.data.data) {
        console.log(result.attributes.name);
        const character = result.attributes;
        charactersList.innerHTML += `
                <div class="character"   >
              <h5>Character name: ${character.name}</h5>
              <h5 data-id="${result.id}"> Character details </h5>  
              <hr>
          </div>
          
        `;
        characterDetails.innerHTML = "";
      }
    }) //each character
    .catch(function (err) {
      console.log(`Error loading character results`, err);
      charactersList.innerHTML =
        "There was an error performing the search. Please try again.";
    });
}); // end of .addEventListener 'submit'

charactersList.addEventListener("click", (ev) => {
  if (ev.target.nodeName === "H5") {
    console.log(`click!`, ev.target.dataset.id);

    const url = `https://api.potterdb.com/v1/characters/${ev.target.dataset.id}`;
    axios.get(url).then(function (response) {
      console.log(response.data);
      const character = response.data.data;
      charactersList.style.display = "none";

      characterDetails.innerHTML = `
          <h4>Character Name:${character.attributes.name}</h5>
      <h4>Character nationality: ${
        character.attributes.nationality === null
          ? "Nationality is not provided"
          : character.attributes.nationality
      }</h2>
        <h5>  Character Born :  ${
          character.attributes.born === null
            ? "born not provided"
            : character.attributes.born
        } </h5>
        <h5>Character Gender :${
          character.attributes.gender === null
            ? "gender not provided"
            : character.attributes.gender
        }<h5>
        <div class="imgmove">
        ${
          character.attributes.image
            ? `<img src="${character.attributes.image}" alt="${character.name} Poster">`
            : "Image not provided"
        }
      </div>
        
      `;
    });
  }
}); // results click handler

//new movie

const searchmovie = document.querySelector(" #searchmovie ");
const movieInput = document.querySelector(" #movieInput ");
const movieList = document.querySelector(" #movieList ");
const movieSummary = document.querySelector(" #movieSummary ");

searchmovie.addEventListener("submit", function (ev) {
  ev.preventDefault(); // Don't reload the page!
  // ev.stopPropagation();

  const movieurl = `https://api.potterdb.com/v1/movies?title=${movieInput.value}}`;
  console.log(movieurl);
  axios
    .get(movieurl)
    .then(function (response) {
      console.log(response.data.data);
      for (const result of response.data.data) {
        console.log(result.attributes.title);
        const movie = result.attributes;
        movieList.innerHTML += `
        <div class="movie">
        <h3>Movie Title: ${movie.title}</h3>
        <h4 data-id="${result.id}"> summary </h4>
        <hr>
        `;
      } // each movie
    }) // .then()
    .catch(function (err) {
      console.log(`Error loading movie results`, err);
      movieList.innerHTML =
        "There was an error performing the search. Please try again.";
    });
}); // end of .addEventListener 'submit'

movieList.addEventListener("click", (ev) => {
  if (ev.target.nodeName === "H4") {
    console.log(`Movie Title:`, ev.target.dataset.id);
    const url = `https://api.potterdb.com//v1/movies/${ev.target.dataset.id}`;
    axios
      .get(url)
      .then(function (response) {
        // Assuming it returns an array and we'll take the first element
        const movie = response.data.data;

        console.log(response.data.data);
        movieList.innerHTML = "";
        movieSummary.innerHTML = "";

        if (movie) {
          //movieList.style.display = "none";
          movieSummary.innerHTML += `
          <h3>Movie Title: ${movie.attributes.title}</h3>

          <h3>Movie Summary: ${movie.attributes.summary}</h3>
        `;
        } else {
          movieSummary.innerHTML = "Movie details not found.";
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        movieSummary.innerHTML =
          "There was an error fetching the movie details.";
      });
  }
}); // results click handler
// Array of Harry Potter images
const harryPotterImages = [
  "pic/pic11.jpg",
  "pic/pic2.jpg",
  "pic/pic3.jpg",
  "pic/pic4.jpg",
  "pic/pic5.jpg",
];
function changeImage() {
  // Select a random image URL
  const randomImage =
    harryPotterImages[Math.floor(Math.random() * harryPotterImages.length)];

  // Create an img element and set its source to the random image URL
  const imgElement = document.createElement("img");
  imgElement.src = randomImage;

  // Remove previous images to avoid accumulation
  const existingImages = document.querySelectorAll("header img");
  existingImages.forEach((img) => img.remove());

  // Add the image to the header
  const header = document.querySelector("header");
  header.appendChild(imgElement);
}
// Change image every 20 seconds
setInterval(changeImage, 2000); //
