// src/js/auction.js

// Function to generate Unsplash image URL with encoded query and fallback
const getUnsplashImage = (query) => {
    return `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}`;
  };
  
  // Array of auction items with improved Unsplash image handling
  export const auctions = [
    {
      id: 1,
      title: "Vintage Camera",
      description: "A classic vintage camera in excellent condition.",
      image: getUnsplashImage("vintage camera"),
      currentBid: 50,
      category: "Electronics",
      timeLeft: "2h 30m",
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "A sleek smartwatch with fitness tracking features.",
      image: getUnsplashImage("smartwatch"),
      currentBid: 120,
      category: "Electronics",
      timeLeft: "1h 45m",
    },
    {
      id: 3,
      title: "Leather Jacket",
      description: "A stylish leather jacket for men.",
      image: getUnsplashImage("leather jacket"),
      currentBid: 80,
      category: "Fashion",
      timeLeft: "3h 15m",
    },
    {
      id: 4,
      title: "Modern Sofa",
      description: "A comfortable and stylish modern sofa.",
      image: getUnsplashImage("modern sofa"),
      currentBid: 200,
      category: "Furniture",
      timeLeft: "4h 10m",
    },
    {
      id: 5,
      title: "Digital Camera",
      description: "A high-resolution digital camera for professionals.",
      image: getUnsplashImage("digital camera"),
      currentBid: 300,
      category: "Electronics",
      timeLeft: "5h 20m",
    },
  ];
  
  
  // Function to filter auctions by category and price range
  export const filterAuctions = (auctions, category, minPrice, maxPrice) => {
    return auctions.filter((auction) => {
      const matchesCategory = category ? auction.category === category : true;
      const matchesPrice =
        (minPrice ? auction.currentBid >= minPrice : true) &&
        (maxPrice ? auction.currentBid <= maxPrice : true);
      return matchesCategory && matchesPrice;
    });
  };
  
  // Function to place a bid on an auction
  export const placeBid = (auctions, id, bidAmount) => {
    const auction = auctions.find((auction) => auction.id === id);
    if (auction && bidAmount > auction.currentBid) {
      auction.currentBid = bidAmount;
      return true; // Bid successful
    }
    return false; // Bid failed
  };
  
  // Function to render auctions on the webpage
  export const renderAuctions = (auctions, container) => {
    if (!container) {
      console.error("Container element not found!");
      return;
    }
  
    container.innerHTML = auctions
      .map(
        (auction) => `
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <img src="${auction.image}" alt="${auction.title}" class="w-full h-48 object-cover rounded-lg">
          <h3 class="text-xl font-semibold mt-4">${auction.title}</h3>
          <p class="text-gray-600">${auction.description}</p>
          <p class="text-gray-600">Current Bid: $${auction.currentBid}</p>
          <p class="text-gray-600">Time Left: ${auction.timeLeft}</p>
          <button data-id="${auction.id}" class="place-bid-btn bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600">
            Place Bid
          </button>
        </div>
      `
      )
      .join("");
  
    // Add event listeners to place bid buttons
    const bidButtons = document.querySelectorAll(".place-bid-btn");
    bidButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const auctionId = parseInt(button.getAttribute("data-id"));
        const bidAmount = parseFloat(prompt("Enter your bid amount:"));
        if (placeBid(auctions, auctionId, bidAmount)) {
          alert("Bid placed successfully!");
          renderAuctions(auctions, container); // Re-render auctions
        } else {
          alert("Bid amount must be higher than the current bid.");
        }
      });
    });
  };