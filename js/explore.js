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

      console.log("data: ", data);

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
        <div class="explore__grid-item" id="${post.postId}" onclick="showExplorePopup('${post.postId}')">
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








//================================================================================================//
//================================================================================================//
// pop-up




// Update user details in popup
function updateUserDetails(postData) {
  const userPicElements = document.querySelectorAll(".explore__user-pic");
  const userNameElements = document.querySelectorAll(".explore__user-name");
  const postCaptionElement = document.querySelector(".explore__user-caption");
  const popupImg = document.getElementById("popupImg");

  console.log("Post data:", postData);
  console.log("postCaptionElement:", postCaptionElement);

  popupImg.src = postData.postImg;

  // Update user pictures (handle null avatar)
  userPicElements.forEach((el) => {
    el.style.backgroundImage = postData.userAvt
      ? `url(${postData.userAvt})`
      : "url(./assets/images/profileImage/default-user.png)";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
  });

  // Update usernames
  userNameElements.forEach((el) => {
    el.textContent = postData.username || "Unknown User";
  });

  // Update post caption (ensure there's a caption element and post has a caption)
  if (postCaptionElement) {
    postCaptionElement.textContent = postData.caption || "";
  } else {
    console.warn("No caption element found in the popup");
  }
}

// Update comments in popup
function updateComments(comments) {
  const commentContainer = document.querySelector(".explore__details-comment");

  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      const commentEl = document.createElement("div");
      commentEl.classList.add("explore__post-comment");
      commentEl.innerHTML = `
                <div class="explore__user-pic" style="background-image: url(${comment.avt})"></div>
                <div class="explore__user-name-caption">
                    <div class="explore__user-name">${comment.username}</div>
                    <div class="explore__user-comment">${comment.content}</div>
                </div>
            `;
      commentContainer.appendChild(commentEl);
    });
  }
}

// Update like information
function updateLikeInfo(postData) {
  const likeCountElement = document.querySelector(".explore__like-count");
  const likePostButton = document.querySelector(".explore__like-post");
  const likeIcon = likePostButton.querySelector("svg");

  // Update like count
  likeCountElement.textContent = `${postData.numberOfLike} likes`;

  // Update like button state
  if (postData.like) {
    likeIcon.classList.add("liked");
  } else {
    likeIcon.classList.remove("liked");
  }

  // Set up like/unlike functionality
  likePostButton.onclick = () => handleLikePost(postData.postId, postData.like);
}

// Fetch post details
function fetchPostDetails(postId) {
  return new Promise((resolve, reject) => {
    const token = getTokenFromCookie();
    fetch(`http://localhost:81/social-network/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post data:", data);
        resolve(data.result);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        reject(error);
      });
  });
}

// Handle like/unlike post
function handleLikePost(postId, isCurrentlyLiked) {
  const token = getTokenFromCookie();
  const likePostButton = document.querySelector(".explore__like-post");
  const likeIcon = likePostButton.querySelector("svg");
  const likeCountElement = document.querySelector(".explore__like-count");

  fetch(`http://localhost:81/social-network/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to like/unlike post");
      }
      return response.json();
    })
    .then((data) => {
      // Update like state and count
      if (isCurrentlyLiked) {
        likeIcon.classList.remove("liked");
        const currentLikes = parseInt(
          likeCountElement.textContent.split(" ")[0]
        );
        likeCountElement.textContent = `${currentLikes - 1} likes`;
      } else {
        likeIcon.classList.add("liked");
        const currentLikes = parseInt(
          likeCountElement.textContent.split(" ")[0]
        );
        likeCountElement.textContent = `${currentLikes + 1} likes`;
      }
    })
    .catch((error) => {
      console.error("Error liking/unliking post:", error);
    });
}

// Shows popup when image is clicked and fetches post details
async function showExplorePopup(postId) {
  // Get popup elements
  const popup = document.getElementById("imagePopup");

  // Set initial image
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.querySelector(".explore__main-content-explore").style.overflow =
    "hidden";

  // Create URL with query parameter postId
  const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/explore?postId=${postId}`;
  history.replaceState(null, "", postUrl);

  try {
    // Fetch post details
    const postData = await fetchPostDetails(postId);

    // Update popup content
    updateUserDetails(postData);
    updateComments(postData.commentInPostResponseList);
    updateLikeInfo({ ...postData, postId });
  } catch (error) {
    console.error("Error updating popup:", error);
    // Optional: Show error message in popup
  }
}

// Close popup function
function closeExplorePopup() {
  document.getElementById("imagePopup").style.display = "none";
  document.body.style.overflow = "auto";
  document.querySelector(".explore__main-content-explore").style.overflow =
    "auto";

  // Quay lại URL gốc không có query parameter, không thêm vào lịch sử
  history.replaceState(
    null,
    "",
    "http://localhost:8080/Social-Network-Project-Instagram/explore"
  );
}
