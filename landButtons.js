document.addEventListener("DOMContentLoaded", () => {
    const landButtons = document.querySelectorAll(".land-buttons button");
    const landsContainer = document.querySelector(".lands");
  
    // Map colors to Scryfall image URLs
    const landImages = {
      white: "https://cards.scryfall.io/large/front/4/e/4ef17ed4-a9b5-4b8e-b4cb-2ecb7e5898c3.jpg?1729889194", // Plains
      red: "https://cards.scryfall.io/large/front/2/7/279df7e2-2a3b-464a-a7df-e91da28e3a8c.jpg?1729888757", // Mountain
      green: "https://cards.scryfall.io/large/front/d/2/d232fcc2-12f6-401a-b1aa-ddff11cb9378.jpg?1729887049", // Forest
      black: "https://cards.scryfall.io/large/front/3/1/319bc1f0-ee42-44e5-b08b-735613ded2ba.jpg?1729890169", // Swamp
      blue: "https://cards.scryfall.io/large/front/1/7/17e2b637-72b1-4457-aaba-66d51107be4c.jpg?1729888078" // Island
    };
  
    // Function to add a land card with image
    function addLandCard(color) {
      const landCard = document.createElement("div");
      landCard.classList.add("land-card");
  
      const img = document.createElement("img");
      img.src = landImages[color];
      img.alt = `${color.charAt(0).toUpperCase() + color.slice(1)} Land`;
      img.style.width = "100px"; // Adjust as needed for display size
  
      landCard.appendChild(img);
      landsContainer.appendChild(landCard);
    }
  
    // Event listener for each button
    landButtons.forEach(button => {
      button.addEventListener("click", () => {
        addLandCard(button.className);
      });
    });
  });