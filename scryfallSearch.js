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
      // Check the card's type
      const cardType = card.type_line.toLowerCase();
    
      if (cardType.includes("instant") || cardType.includes("sorcery")) {
        // Display instant or sorcery cards temporarily
        displayTemporaryCard(card);
      } else if (cardType.includes("creature")) {
        // Add creature cards to the creatures section
        addCardToSection(card, ".creatures");
      } else {
        // Add non-creature cards to the enchantments section
        addCardToSection(card, ".enchantsDiv");
      }
    }
    
    function addCardToSection(card, sectionSelector) {
      const container = document.querySelector(sectionSelector);
    
      // Create a new element for the selected card
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      
      // Add the card image with higher resolution
      const cardImage = document.createElement("img");
      cardImage.src = card.image_uris?.large || ""; // Use 'large' image for better quality
      cardImage.alt = card.name;
      cardImage.classList.add("card-image");
    
      cardElement.appendChild(cardImage);
    
      // Add click event to toggle tapped state for creature and enchantment cards
      cardElement.addEventListener("click", () => {
        if (!cardType.includes("instant") && !cardType.includes("sorcery")) {
          cardElement.classList.toggle("tapped");
        }
      });
    
      // Add right-click event to remove the card for creature and enchantment cards
      cardElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        container.removeChild(cardElement);
      });
    
      // Append the card element to the selected section
      container.appendChild(cardElement);
    
      console.log(`Added card to ${sectionSelector} area:`, card);
    }
    
    function displayTemporaryCard(card) {
      const tempContainer = document.createElement("div");
      tempContainer.classList.add("temporary-card");
    
      const cardImage = document.createElement("img");
      cardImage.src = card.image_uris?.large || ""; // Use 'large' image for better quality
      cardImage.alt = card.name;
      cardImage.classList.add("card-image");
    
      tempContainer.appendChild(cardImage);
      document.body.appendChild(tempContainer);
    
      // Automatically remove the card after a few seconds
      setTimeout(() => {
        tempContainer.remove();
      }, 5000); // Display for 5 seconds
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