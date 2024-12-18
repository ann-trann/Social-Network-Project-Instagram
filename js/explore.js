// Utility function to get token from cookie
function getTokenFromCookie() {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function showExplorePosts() {
  // Global seed variable initialized with current timestamp
  const exploreSeed = Date.now();

  // Function to fetch and display explore posts
  async function fetchAndDisplayExplorePosts(
    seed = exploreSeed,
    offset = 0,
    limit = 10
  ) {
    try {
      const response = await fetch(
        `http://localhost:81/social-network/posts/explore?seed=${seed}&offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch explore posts");
      }

      const data = await response.json();

      const exploreContainer = document.querySelector(".explore__explore-grid");

      // Clear existing posts only if it's the first page (offset 0)
      if (offset === 0) {
        exploreContainer.innerHTML = "";
      }

      data.result.forEach((post) => {
        const postElement = createExplorePostElement(post);
        exploreContainer.insertAdjacentHTML("beforeend", postElement);
      });

      // Add event listeners for post popup
      addExplorePostEventListeners();

      // Return the seed for potential future use
      return seed;
    } catch (error) {
      console.error("Error fetching explore posts:", error);
      // Optional: Show error message to user
      const exploreContainer = document.querySelector(".explore__explore-grid");
      exploreContainer.innerHTML = `<div class="error-message">Failed to load explore posts. Please try again later.</div>`;

      // Return the original seed in case of error
      return seed;
    }
  }

  // Function to create explore post HTML element
  function createExplorePostElement(post) {
    return `
      <div class="explore__grid-item" id="${post.postId}" onclick="showPopup('${post.postId}', 'explore')">
        <img src="${post.postImg}" alt="Explore Post">
        <div class="explore__overlay">
        <div class="explore__overlay-stats">
          <div class="explore__stat-item">
          <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
          <span>${post.numberOfLike}</span>
          </div>
          <div class="explore__stat-item">
          <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
          <span>${post.numberOfComment}</span>
          </div>
        </div>
        </div>
      </div>
      `;
  }

  // Function to add event listeners for explore posts
  function addExplorePostEventListeners() {
    const exploreGridItems = document.querySelectorAll(".explore__grid-item");
    exploreGridItems.forEach((item) => {
      // You can add additional event listeners if needed
      // Currently using inline onclick for showPopup
    });
  }

  // Event listener for initial page load
  document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayExplorePosts(); // Uses default offset=0, limit=10
  });

  // Optional: Implement infinite scroll or load more functionality
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // User has scrolled to the bottom, load more posts
      const currentOffset = document.querySelectorAll(
        ".explore__grid-item"
      ).length;
      fetchAndDisplayExplorePosts(exploreSeed, currentOffset);
    }
  });

  // Expose functions for potential manual use or testing
  return {
    fetchAndDisplayExplorePosts,
  };
}

// Initialize explore posts functionality
const explorePostsManager = showExplorePosts();





