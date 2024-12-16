document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".home__posts-container");

  // Hàm load dữ liệu từ file JSON
  fetch("./js/post_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch post data");
      }
      return response.json();
    })
    .then((data) => {
      const posts = data.posts;

      posts.forEach((post) => {
        const postElement = `
                  <div class="home__instagram-post" id="${post.id}">
                      <div class="home__post-header">
                          <div class="home__profile-pic">
                              <img src="${post.profilePic}" alt="${post.username}">
                          </div>
                          <a href="profile?username=${post.username}" class="home__username">${post.username}</a>
                          <div class="home__dots">...</div>
                      </div>
  
                      <div class="home__post-image-container">
                          <img src="${post.postImage}" alt="Image from ${post.username}" class="home__post-image">
                      </div>
  
                      <div class="home__post-actions">
                          <div class="home__like-post" data-liked="false">
                              <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Like</title>
                                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                              </svg>
                          </div>
                          <div class="home__comment-post">
                              <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Comment</title>
                                  <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                              </svg>
                          </div>
                      </div>
  
                      <div class="home__likes">${post.likes} likes</div>
                      <div class="home__username-caption">${post.username}</div>
                      <div class="home__caption">${post.caption}</div>
                      <div class="home__view-comments">View all ${post.comments} comments</div>
                  </div>
                  `;
        postsContainer.insertAdjacentHTML("beforeend", postElement);
      });

      // Add event listeners for like functionality after posts are loaded
      document.querySelectorAll(".home__like-post").forEach((likeButton) => {
        likeButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent event bubbling

          // Get the parent post element
          const postElement = likeButton.closest(".home__instagram-post");

          // Get the likes element
          const likesElement = postElement.querySelector(".home__likes");

          // Parse the current number of likes
          let likesCount = parseInt(
            likesElement.textContent.replace(" likes", "")
          );
          // Toggle like state
          const isLiked = likeButton.getAttribute("data-liked") === "true";

          if (isLiked) {
            // Unlike: change to original svg and decrement likes
            likeButton.innerHTML = `
              <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Like</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>`;
            likeButton.setAttribute("data-liked", "false");
            likesCount--;
          } else {
            // Like: change to new svg and increment likes
            likeButton.innerHTML = `
              <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="#F00" height="24" role="img" viewBox="0 0 48 48" width="24">
                <title>Unlike</title>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>`;
            likeButton.setAttribute("data-liked", "true");
            likesCount++;
          }

          // Update likes count
          likesElement.textContent = `${likesCount} likes`;
        });
      });
    })
    .catch((error) => {
      console.error("Error loading posts:", error);
    });
});




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





// pop-up

// Shows popup when image is clicked
function showPopup(imgSrc, user, caption, postId) {
    // Tạo URL với query parameter postId
    const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/explore?postId=${postId}`;
    
    // Mở popup như bình thường
    document.getElementById('imagePopup').style.display = 'flex';
    document.getElementById('popupImg').src = imgSrc;
    
    // Thay thế URL hiện tại mà không thêm vào lịch sử
    history.replaceState(null, '', postUrl);
    
    document.body.style.overflow = 'hidden';
    document.querySelector('.explore__main-content-explore').style.overflow = 'hidden';
}

// Closes popup when close button is clicked
function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.explore__main-content-explore').style.overflow = 'auto';
    
    // Quay lại URL gốc không có query parameter, không thêm vào lịch sử
    history.replaceState(null, '', 'http://localhost:8080/Social-Network-Project-Instagram/explore');
}