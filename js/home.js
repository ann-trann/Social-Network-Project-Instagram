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

function showHomePosts() {
  // Function to fetch and display posts
  async function fetchAndDisplayPosts() {
    try {
      const url = `http://localhost:81/social-network/posts/`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      const postsContainer = document.querySelector(".home__posts-container");
      postsContainer.innerHTML = ""; // Clear existing posts

      data.result.forEach((post) => {
        const postElement = createPostElement(post);
        postsContainer.insertAdjacentHTML("beforeend", postElement);
      });

      // Add event listeners for like functionality
      addLikeEventListeners();
    } catch (error) {
      console.error("Error fetching posts:", error);
      const postsContainer = document.querySelector(".home__posts-container");
      postsContainer.innerHTML = `<div class="error-message">Failed to load posts. Please try again later.</div>`;
    }
  }

  // Function to create post HTML element
  function createPostElement(post) {
    return `
          <div class="home__instagram-post" id="${post.postId}">
              <div class="home__post-header">
                  <div class="home__profile-pic">
                      <img src="${post.postOwnerAvt}" alt="${post.username}">
                  </div>
                  <a href="user?user_id=${post.postOwnerId}" class="home__username">${post.username}</a>
                  <div class="home__dots">...</div>
              </div>

              <div class="home__post-image-container">
                  <img src="${post.postImg}" alt="Image from ${post.username}" class="home__post-image">
              </div>

              <div class="home__post-actions">
                  <div class="home__like-post" data-liked="${post.isLike}" data-post-id="${post.postId}">
                      ${post.isLike ? createLikedSvg() : createUnlikedSvg()}
                  </div>
                  <div class="home__comment-post">
                      <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                          <title>Comment</title>
                          <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                  </div>
              </div>

              <div class="home__likes">${post.numberOfLike} likes</div>
              <div class="home__username-caption">${post.username}</div>  
              <div class="home__caption">${post.content}</div>
              <div class="home__view-comments" onclick="showHomePopup('${post.postId}')">
                  View all ${post.numberOfComment} comments
              </div>
          </div>
      `;
  }

  // Function to fetch post details
  async function fetchMainPostDetails(postId) {
    try {
      const response = await fetch(
        `http://localhost:81/social-network/posts/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch post details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching post details:", error);
      return null;
    }
  }

  // Function to update post (like/unlike)
  async function updatePost(postId, action) {
    try {
      const response = await fetch(
        `http://localhost:81/social-network/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  // Helper functions for SVG icons
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

  // Function to add like event listeners
  function addLikeEventListeners() {
    document.querySelectorAll(".home__like-post").forEach((likeButton) => {
      likeButton.addEventListener("click", async (event) => {
        event.stopPropagation();

        const postElement = likeButton.closest(".home__instagram-post");
        const likesElement = postElement.querySelector(".home__likes");
        const postId = likeButton.getAttribute("data-post-id");
        const isCurrentlyLiked = likeButton.getAttribute("data-liked") === "true";

        const action = isCurrentlyLiked ? "UNLIKE" : "LIKE";
        const updateResult = await updatePost(postId, action);

        if (updateResult) {
          let likesCount = parseInt(likesElement.textContent.replace(" likes", ""));

          if (isCurrentlyLiked) {
            likeButton.innerHTML = createUnlikedSvg();
            likeButton.setAttribute("data-liked", "false");
            likesCount--;
          } else {
            likeButton.innerHTML = createLikedSvg();
            likeButton.setAttribute("data-liked", "true");
            likesCount++;
          }

          likesElement.textContent = `${likesCount} likes`;
        }
      });
    });
  }

  // Initialize home posts on page load
  document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayPosts();
  });

  // Expose functions for potential external use
  return {
    fetchMainPostDetails,
    updatePost,
    fetchAndDisplayPosts,
  };
}

// Initialize the home post functionality
const homePostManager = showHomePosts();




//================================================================================================
//================================================================================================
//================================================================================================



// Keep the existing caption more/less functionality
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".home__caption").forEach((caption) => {
    // Simple condition to check if text is too long
    if (caption.scrollHeight > caption.clientHeight) {
      // Create More span
      const moreSpan = document.createElement("span");
      moreSpan.classList.add("home__caption-more");
      moreSpan.textContent = "More";

      // Add click event
      moreSpan.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event bubbling

        // Toggle expanded class
        caption.classList.toggle("expanded");

        // Update button text
        moreSpan.textContent = caption.classList.contains("expanded")
          ? "Less"
          : "More";
      });

      // Append the "More" span
      caption.appendChild(moreSpan);
    }
  });
});

//================================================================================================
//================================================================================================
//================================================================================================
// pop-up

// Update user details in popup
function updateUserDetails(postData) {
  const userPicElements = document.querySelectorAll(".home__user-pic");
  const userNameElements = document.querySelectorAll(".home__user-name");
  const postCaptionElement = document.querySelector(".home__user-caption");
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
  const commentContainer = document.querySelector(".home__details-comment");

  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      const commentEl = document.createElement("div");
      commentEl.classList.add("home__post-comment");
      commentEl.innerHTML = `
              <div class="home__user-pic" style="background-image: url(${comment.avt})"></div>
              <div class="home__user-name-caption">
                  <div class="home__user-name">${comment.username}</div>
                  <div class="home__user-comment">${comment.content}</div>
              </div>
          `;
      commentContainer.appendChild(commentEl);
    });
  }
}

// Update like information
function updateLikeInfo(postData) {
  const likeCountElement = document.querySelector(".home__like-count");
  const likePostButton = document.querySelector(".home__like-post");
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
  const likePostButton = document.querySelector(".home__like-post");
  const likeIcon = likePostButton.querySelector("svg");
  const likeCountElement = document.querySelector(".home__like-count");

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
async function showHomePopup(postId) {
  // Get popup elements
  const popup = document.getElementById("homeImagePopup");

  // Set initial image
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.querySelector(".home__main-content-home").style.overflow = "hidden";

  // Create URL with query parameter postId
  const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/home?postId=${postId}`;
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
function closeHomePopup() {
  document.getElementById("homeImagePopup").style.display = "none";
  document.body.style.overflow = "auto";
  document.querySelector(".home__main-content-home").style.overflow = "auto";

  // Quay lại URL gốc không có query parameter, không thêm vào lịch sử
  history.replaceState(
    null,
    "",
    "http://localhost:8080/Social-Network-Project-Instagram/home"
  );
}




//================================================================================================
//================================================================================================
//================================================================================================



// Function to decode JWT token
function decodeJWTToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}



// Function to render user profile data
function renderUserPreview(data) {

  console.log('User data:', data);
  const userPreview = document.querySelector('.home__user-preview');
  const profileImage = userPreview.querySelector('img');
  const usernameElement = userPreview.querySelector('h4');
  const fullNameElement = userPreview.querySelector('p');

  // Update profile image (use default if not available)
  profileImage.src = data.avt || 'default-avatar.png'; // Use 'avt' as key for avatar
  
  // Update username and full name
  usernameElement.textContent = data.username || 'Unknown';
  fullNameElement.textContent = data.fullname || 'No Bio';
}

// Function to update user preview
function updateUserPreview() {
  const token = getTokenFromCookie();

  if (token) {
      const decodedToken = decodeJWTToken(token);

      if (decodedToken && decodedToken.sub) {
          const userId = decodedToken.sub;

          // Fetch user profile data
          fetch(`http://localhost:81/social-network/users/${userId}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch user details');
              }
              return response.json();
          })
          .then(data => {
              if (data.result) {
                  renderUserPreview(data.result);
              } else {
                  console.error('No user details found');
              }
          })
          .catch(error => {
              console.error('Error fetching user details:', error);
          });
      } else {
          console.error('Invalid token or missing user ID');
      }
  } else {
      console.error('No token found');
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateUserPreview);
