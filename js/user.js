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

            postItem.onclick = () => showUserPostPopup(post.postImg, post.postId);
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



// Shows popup when image is clicked and fetches post details
async function showUserPostPopup(imgSrc, postId) {
    // Lấy user_id hiện tại từ URL
    const currentUrl = new URL(window.location.href);
    const userId = currentUrl.searchParams.get("user_id");

    // Tạo URL mới chứa cả postId và user_id
    const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/user?user_id=${userId}&postId=${postId}`;

    // Hiển thị popup
    document.getElementById("userImagePopup").style.display = "flex";
    document.getElementById("popupImg").src = imgSrc;

    // Thay thế URL mà không thêm vào lịch sử
    history.replaceState(null, "", postUrl);

    document.body.style.overflow = "hidden";
    document.querySelector(".user__main-content-profile").style.overflow = "hidden";

    try {
        // Fetch post details
        const postData = await fetchPostDetails(postId);

        // Update popup content
        updateUserDetails(postData);
        updateComments(postData.commentInPostResponseList);
        updateLikeInfo({...postData, postId});
    } catch (error) {
        console.error('Error updating popup:', error);
        // Optional: Show error message in popup
    }
}

// Update user details in popup
function updateUserDetails(postData) {
    const userPicElements = document.querySelectorAll('.user__user-pic');
    const userNameElements = document.querySelectorAll('.user__user-name');
    const postCaptionElement = document.querySelector('.user__user-caption');

    // Update user pictures (handle null avatar)
    userPicElements.forEach(el => {
        el.style.backgroundImage = postData.userAvt 
            ? `url(${postData.userAvt})` 
            : 'url(./assets/images/profileImage/default-user.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.style.backgroundRepeat = 'no-repeat';
    });

    // Update usernames
    userNameElements.forEach(el => {
        el.textContent = postData.username || 'Unknown User';
    });

    // Update post caption
    if (postCaptionElement) {
        postCaptionElement.textContent = postData.caption || '';
    } else {
        console.warn('No caption element found in the popup');
    }
}

// Update comments in popup
function updateComments(comments) {
    const commentContainer = document.querySelector('.user__details-comment');
    
    // Clear existing comments
    const postCommentSection = commentContainer.querySelector('.user__post-comment');
    if (postCommentSection) {
        commentContainer.innerHTML = ''; // Clear existing comments
    }

    if (comments && comments.length > 0) {
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('user__post-comment');
            commentEl.innerHTML = `
                <div class="user__user-pic" style="background-image: url(${comment.avt})"></div>
                <div class="user__user-name-caption">
                    <div class="user__user-name">${comment.username}</div>
                    <div class="user__user-comment">${comment.content}</div>
                </div>
            `;
            commentContainer.appendChild(commentEl);
        });
    }
}

// Update like information
function updateLikeInfo(postData) {
    const likeCountElement = document.querySelector('.user__like-count');
    const likePostButton = document.querySelector('.user__like-post');
    const likeIcon = likePostButton.querySelector('svg');

    // Update like count
    likeCountElement.textContent = `${postData.numberOfLike} likes`;

    // Update like button state
    if (postData.like) {
        likeIcon.classList.add('liked');
    } else {
        likeIcon.classList.remove('liked');
    }

    // Set up like/unlike functionality
    likePostButton.onclick = () => handleLikePost(postData.postId, postData.like);
}

// Fetch post details
function fetchPostDetails(postId) {
    return new Promise((resolve, reject) => {
        const token = getTokenFromCookie();
        fetch(`http://localhost:81/social-network/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post details');
            }
            return response.json();
        })
        .then(data => {
            console.log("Post data:", data);
            resolve(data.result);
        })
        .catch(error => {
            console.error('Error fetching post details:', error);
            reject(error);
        });
    });
}

// Handle like/unlike post
function handleLikePost(postId, isCurrentlyLiked) {
    const token = getTokenFromCookie();
    const likePostButton = document.querySelector('.user__like-post');
    const likeIcon = likePostButton.querySelector('svg');
    const likeCountElement = document.querySelector('.user__like-count');

    fetch(`http://localhost:81/social-network/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to like/unlike post');
        }
        return response.json();
    })
    .then(data => {
        // Update like state and count
        if (isCurrentlyLiked) {
            likeIcon.classList.remove('liked');
            const currentLikes = parseInt(likeCountElement.textContent.split(' ')[0]);
            likeCountElement.textContent = `${currentLikes - 1} likes`;
        } else {
            likeIcon.classList.add('liked');
            const currentLikes = parseInt(likeCountElement.textContent.split(' ')[0]);
            likeCountElement.textContent = `${currentLikes + 1} likes`;
        }
    })
    .catch(error => {
        console.error('Error liking/unliking post:', error);
    });
}



// Closes popup when close button is clicked
function closeUserPostPopup() {
    // Lấy user_id hiện tại từ URL
    const currentUrl = new URL(window.location.href);
    const userId = currentUrl.searchParams.get("user_id");

    // Tạo URL mới chỉ với user_id
    const userUrl = `http://localhost:8080/Social-Network-Project-Instagram/user?user_id=${userId}`;

    // Đóng popup
    document.getElementById("userImagePopup").style.display = "none";
    document.body.style.overflow = "auto";
    document.querySelector(".user__main-content-profile").style.overflow = "auto";

    // Khôi phục URL gốc
    history.replaceState(null, "", userUrl);
}




//=========================================================================================================//
//=========================================================================================================//


function follow(userId) {
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








