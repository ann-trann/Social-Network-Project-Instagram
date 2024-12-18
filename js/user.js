let originalUrl = window.location.href; // Lưu URL hiện tại


// Function để lấy query parameter từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy giá trị 'user_id'
const userId = getQueryParam("user_id");

// Kiểm tra giá trị userId
if (userId) {
  console.log("User ID:", userId);
  // Gọi API hoặc thực hiện các thao tác để render dữ liệu của user
  fetchUserData(userId);
} else {
  console.error("User ID is missing!");
  alert("Invalid user profile!");
}



// Function to get token from cookie
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



function fetchUserData(userId) {
  fetch(`http://localhost:81/social-network/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getTokenFromCookie()}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((data) => {
      renderUserProfile(data.result);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("Error loading user data.");
    });
}

// Function to render profile details
function renderUserProfile(profile) {
    // Update profile picture
    const profilePicture = document.querySelector('.user__profile-picture img');
    profilePicture.src = profile.avt || "./assets/images/profileImage/default-user.png";

    // Update username and buttons
    const username = document.querySelector('.user__username');
    username.textContent = profile.username || "Unnamed User";

    // Update follow/message buttons based on follow status
    const followBtn = document.querySelector('.user__follow-btn');
    const messageBtn = document.querySelector('.user__message-btn');
    
    if (profile.follow) {
        followBtn.textContent = 'Unfollow';
        followBtn.classList.remove('following');
    } else {
        followBtn.textContent = 'Follow';
        followBtn.classList.add('following');
    }

    // Update profile stats
    const postStats = document.querySelector('.user__profile-stats span:first-child strong');
    const followersStats = document.querySelector('.user__followers-stats strong');
    const followingStats = document.querySelector('.user__following-stats strong');

    postStats.textContent = profile.numberOfPost || "0";
    followersStats.textContent = profile.numberOfFollower || "0";
    followingStats.textContent = profile.numberOfFollowing || "0";

    // Update full name and bio
    const fullName = document.querySelector('.user__full-name');
    const bioText = document.querySelector('.user__bio-text');

    fullName.textContent = profile.fullname || "No Name";
    bioText.textContent = profile.bio || "No bio available";

    // Render profile posts
    const postContainer = document.querySelector('.user__profile-posts');
    postContainer.innerHTML = ''; // Clear existing posts

    if (profile.postProfileResponses && profile.postProfileResponses.length > 0) {
        const postGrid = document.createElement('div');
        postGrid.classList.add('explore__explore-grid');

        profile.postProfileResponses.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('explore__grid-item');
            postItem.innerHTML = `
            <img src="${post.postImg}" alt="Profile Post">
            <div class="explore__overlay">
                <div class="explore__overlay-stats">
                <div class="explore__stat-item">
                    <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                    <span>${post.numberOfLike || 0}</span>
                </div>
                <div class="explore__stat-item">
                    <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                    <span>${post.numberOfComment || 0}</span>
                </div>
                </div>
            </div>
            `;

            postItem.onclick = () => showPopup(post.postId, 'user');
            postGrid.appendChild(postItem);
        });

        postContainer.appendChild(postGrid);
    } else {
        // Show no posts message if no posts exist
        postContainer.innerHTML = `
            <div class="user__no-posts">
                <div class="user__camera-icon">
                    <i class="fas fa-camera"></i>
                </div>
                <h2>No Posts Yet</h2>
            </div>
        `;
    }

    
    followBtn.onclick = () => {
        if (followBtn.classList.contains('following')) {
            follow(userId);
            followBtn.textContent = 'Unfollow';
            followBtn.classList.remove('following');
        
        } else {
            unfollow(userId);
            followBtn.textContent = 'Follow';
            followBtn.classList.add('following');
        
        }
    }

}



//=========================================================================================================
//=========================================================================================================



function follow(userId) {
    
    console.log("Follow user ID:", userId);
    const token = getTokenFromCookie();
    fetch(`http://localhost:81/social-network/users/follow/${userId}`, {
        method: 'POST',
        headers: {  
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to follow user');
        }
    })
    .catch(error => {
        console.error('Error following user:', error);
    });
}


function unfollow(userId) {
    const token = getTokenFromCookie();
    fetch(`http://localhost:81/social-network/users/unfollow/${userId}`, {
        method: 'PATCH',
        headers: {  
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to follow user');
        }
    })
    .catch(error => {
        console.error('Error following user:', error);
    });
}




// =========================================================================================================
// =========================================================================================================

// Add an event listener to the Message button on the user profile page
document.addEventListener('DOMContentLoaded', function() {
  const messageBtn = document.querySelector('.user__message-btn');
  
  console.log('Message button:', messageBtn);
  if (messageBtn) {
      messageBtn.addEventListener('click', function() {

          console.log('Message button clicked');
          // Get the user ID (assuming it's available in the page context)
          const userId = getUserId(); // You'll need to implement this function
          
          // Navigate to the messages page with the user's ID
          window.location.href = `/Social-Network-Project-Instagram/message?chat_id=${userId}`;
      });
  }
});

// Helper function to get the user ID
function getUserId() {
  // This could be implemented in various ways:
  // 1. From a data attribute
  const userIdElement = document.querySelector('[data-user-id]');
  if (userIdElement) {
      return userIdElement.getAttribute('data-user-id');
  }
  
  // 2. From the URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  if (userId) {
      return userId;
  }
  
  // 3. From a hidden input or other element
  const hiddenUserIdInput = document.getElementById('user-id');
  if (hiddenUserIdInput) {
      return hiddenUserIdInput.value;
  }
  
  // Fallback or error handling
  console.error('User ID not found');
  return null;
}





