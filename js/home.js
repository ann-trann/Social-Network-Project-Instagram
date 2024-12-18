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

// Global seed variable initialized with current timestamp
const pageSeed = Date.now();

function showHomePosts() {
  // Function to fetch and display posts
  async function fetchAndDisplayPosts(lastCreatedDate = null) {
    try {
      let url = `http://localhost:81/social-network/posts/`;
      if (lastCreatedDate) {
        url += `?lastCreatedDate=${encodeURIComponent(lastCreatedDate)}`;
      }
  
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
  
      // Nếu đã có bài đăng, thì không clear hết, chỉ thêm bài mới
      if (lastCreatedDate === null) {
        postsContainer.innerHTML = ''; // Clear posts nếu là lần đầu tiên tải
      }
  
      // Duyệt qua các bài đăng trả về từ API
      data.result.forEach((post) => {
        const postElement = createPostElement(post);
        postsContainer.insertAdjacentHTML("beforeend", postElement);
  
        if (post.createAt !== null) {
          lastCreatedDate = post.createAt; // Cập nhật lastCreatedDate cho lần gọi sau
        }
      });
  
      // Add like event listeners
      addLikeEventListeners();
  
    } catch (error) {
      console.error("Error fetching posts:", error);
      const postsContainer = document.querySelector(".home__posts-container");
      postsContainer.innerHTML = `<div class="error-message">Failed to load posts. Please try again later.</div>`;
    }
  }

  // Modify the DOMContentLoaded event listener to use the updated function
  document.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
  
    // Kiểm tra nếu người dùng cuộn gần đến cuối trang
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // Nếu đã cuộn gần đến cuối trang, gọi lại fetchAndDisplayPosts với lastCreatedDate
      fetchAndDisplayPosts(lastCreatedDate);
    }
  });

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
                  <img src="${post.postImg}" alt="Image from ${
      post.username
    }" class="home__post-image">
              </div>

              <div class="home__post-actions">
                  <div class="home__like-post" data-liked="${
                    post.like
                  }" data-post-id="${post.postId}">
                      ${post.like ? createLikedSvg() : createUnlikedSvg()}
                  </div>
                  <div class="home__comment-post" onclick="showPopup('${post.postId}', 'home')">
                      <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                          <title>Comment</title>
                          <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                  </div>
              </div>

              <div class="home__likes">${post.numberOfLike} likes</div>
              <a href="user?user_id=${post.postOwnerId}" class="home__username-caption">${post.username}</a>

              <div class="home__caption">${post.content}</div>
              <div class="home__view-comments" onclick="showPopup('${post.postId}', 'home')">
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

  // Initialize home posts on page load
  document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayPosts();
  });

  // Return an object with utility functions
  return {
    fetchMainPostDetails,
    fetchAndDisplayPosts,
    pageSeed,
  };
}

// Initialize the home post functionality
const homePostManager = showHomePosts();

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
//===================================== User Right Sidebar =======================================
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
function renderUserRightSidebar(data) {
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
function updateUserRightSidebar() {
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
                  renderUserRightSidebar(data.result);
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
document.addEventListener('DOMContentLoaded', updateUserRightSidebar);
