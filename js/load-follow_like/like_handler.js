//================================================================================================
//================================ Like handler ================================================//
//================================================================================================


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

// SVG creation functions
function createLikedSvg() {
    return `
    <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="#F00" height="24" role="img" viewBox="0 0 48 48" width="24">
        <title>Unlike</title>
        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>`;
}

function createUnlikedSvg() {
    return `
    <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        <title>Like</title>
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
    </svg>`;
}

// Like handling functionality
async function handleLikePost(postId, isCurrentlyLiked) {
    const token = getTokenFromCookie();
    const likePostButton = document.querySelector(`.home__like-post[data-post-id="${postId}"]`);
    
    if (!likePostButton) {
    console.error(`Like button for post ${postId} not found`);
    return null;
    }

    const likeCountElement = likePostButton.closest('.home__instagram-post').querySelector('.home__likes');
    
    // Immediately update UI optimistically
    let currentLikes = parseInt(likeCountElement.textContent.split(" ")[0]);
    console.log("postIdHome: ", postId);
    
    try {
    // Send the like/unlike request to the server
    const response = await fetch(`http://localhost:81/social-network/posts/${postId}/like`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: isCurrentlyLiked ? "UNLIKE" : "LIKE" })
    });

    if (!response.ok) {
        throw new Error("Failed to like/unlike post");
    }

    // Update UI based on current state
    if (isCurrentlyLiked) {
        // Unlike action
        likePostButton.innerHTML = createUnlikedSvg();
        likePostButton.setAttribute('data-liked', 'false');
        likeCountElement.textContent = `${currentLikes - 1} likes`;
    } else {
        // Like action
        likePostButton.innerHTML = createLikedSvg();
        likePostButton.setAttribute('data-liked', 'true');
        likeCountElement.textContent = `${currentLikes + 1} likes`;
    }

    return true;
    } catch (error) {
    console.error("Error liking/unliking post:", error);
    
    // Revert UI changes if server request fails
    return null;
    }
}

// Add event listeners to all like buttons on the page
function addLikeEventListeners() {
    document.querySelectorAll(".home__like-post").forEach((likeButton) => {
    likeButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        
        const postId = likeButton.getAttribute("data-post-id");
        const isCurrentlyLiked = likeButton.getAttribute("data-liked") === "true";
        
        await handleLikePost(postId, isCurrentlyLiked);
    });
    });
}

// Initialize like event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", addLikeEventListeners);




//================================================================================================
//================================ List users liked post ========================================//
//================================================================================================




document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch users who liked the post
  async function fetchUsersLikedPost(postId) {
    try {
      const response = await fetch(
        `http://localhost:81/social-network/posts/people-like-post/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users who liked the post");
      }

      const data = await response.json();
      console.log("Users who liked the post:", data.result);
      return data.result;
    } catch (error) {
      console.error("Error fetching likes:", error);
      return [];
    }
  }

  // Function to create likes overlay
  async function createLikesOverlay(postId) {
    // Fetch users who liked the post
    const usersLikedPost = await fetchUsersLikedPost(postId);

    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.className = "home_like-overlay";
    overlay.style.display = "flex";

    // Create the likes container
    const likesContainer = document.createElement("div");
    likesContainer.className = "home_like";

    // Create header
    const header = document.createElement("div");
    header.className = "home_like-header";
    header.innerHTML = `
            <h3>Likes</h3>
            <a class="home_like-close-btn"><i class="fas fa-times"></i></a>
        `;

    // Create likes list
    const likesList = document.createElement("div");
    likesList.className = "like__list-followers";

    // Populate likes list with fetched users
    usersLikedPost.forEach((user) => {
      const likeItem = document.createElement("div");
      likeItem.className = "home_like-item";
      likeItem.innerHTML = `
                <div class="home_like-pic" style="background-image: url(${
                  user.avatar || "default-avatar.png"
                })"></div>
                <div class="home_like-info">
                    <h4>${user.username}</h4>
                    <p>${user.fullname || ""}</p>
                </div>
            `;
      likesList.appendChild(likeItem);
    });

    // Assemble the overlay
    likesContainer.appendChild(header);
    likesContainer.appendChild(likesList);
    overlay.appendChild(likesContainer);

    // Add to body
    document.body.appendChild(overlay);

    // Add event listeners
    const closeButton = overlay.querySelector(".home_like-close-btn");
    closeButton.addEventListener("click", () => {
      overlay.remove();
    });

    // Close when clicking outside
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    // Add follow/unfollow functionality
    const followButtons = overlay.querySelectorAll(".follow-btn");
    followButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const userInfo = button.closest(".home_like-info");
        const username = userInfo.querySelector("h4").textContent;

        // TODO: Implement follow/unfollow logic
        // This would typically involve a fetch request to your backend
        button.classList.toggle("following");
        button.textContent = button.classList.contains("following")
          ? "Following"
          : "Follow";
      });
    });
  }

  // Add click event listeners to all likes elements
  function addLikesEventListeners() {
    const postsContainer = document.querySelector(".home__posts-container");
    postsContainer.addEventListener("click", (e) => {
      const likesElement = e.target.closest(".home__likes");
      if (likesElement) {
        // Get the postId from the parent post element
        const postId = likesElement.closest(".home__instagram-post").id;
        createLikesOverlay(postId);
      }
    });
  }

  // Initial setup
  addLikesEventListeners();
});
