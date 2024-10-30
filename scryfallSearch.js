// scryfallSearch.js

document.addEventListener("DOMContentLoaded", () => {
    async function fetchCardData(query) {
      try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
        if (!response.ok) throw new Error("Card search failed.");
        
        const data = await response.json();
        const topThreeResults = data.data.slice(0, 3); // Get the top three results
        displayCardOptions(topThreeResults);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    }
  
    function displayCardOptions(cards) {
      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = ""; // Clear previous results
  
      cards.forEach(card => {
        const cardItem = document.createElement("div");
        cardItem.classList.add("card-option");
        cardItem.textContent = card.name;
        cardItem.addEventListener("click", () => selectCard(card));
        resultsContainer.appendChild(cardItem);
      });
    }
  
    function selectCard(card) {
      console.log("Selected card:", card);
      // Logic to display the selected card in the app goes here
    }
  
    // Event listener for the input field
    const searchInput = document.getElementById("creature-search");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        const query = event.target.value.trim();
        if (query.length > 2) {
          fetchCardData(query);
        }
      });
    } else {
      console.error("Input element with id 'creature-search' not found.");
    }
  });