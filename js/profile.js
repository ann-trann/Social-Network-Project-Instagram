//-------------------------------------------------------------------------------------------------------//
// Overlay for settings in the profile page

document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.querySelector('.profile__settings-option-btn');
    const settingsOverlay = document.querySelector('.profile__setting-overlay');
    const cancelButton = document.querySelector('.profile__item-cancel');

    // Function to show overlay
    function showOverlay() {
        if (settingsOverlay) {
            settingsOverlay.style.display = 'flex';
        }
    }

    // Function to hide overlay
    function hideOverlay() {
        if (settingsOverlay) {
            settingsOverlay.style.display = 'none';
        }
    }

    // Show overlay when settings button is clicked
    if (settingsButton) {
        settingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            showOverlay();
        });
    }

    // Hide overlay when cancel button is clicked
    if (cancelButton) {
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            hideOverlay();
        });
    }

    // Optional: Close overlay when clicking outside the overlay
    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', (e) => {
            if (e.target === settingsOverlay) {
                hideOverlay();
            }
        });
    }
});



// =========================================================================================================//
// =========================================================================================================//




// Utility function to get token from cookie
function getTokenFromCookie() {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



// Update user details in popup
function updateUserDetails(postData) {
    const userPicElements = document.querySelectorAll('.profile__user-pic');
    const userNameElements = document.querySelectorAll('.profile__user-name');
    const postCaptionElement = document.querySelector('.profile__user-caption');

    console.log("Post data:", postData);
    console.log("postCaptionElement:", postCaptionElement);

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

    // Update post caption (ensure there's a caption element and post has a caption)
    if (postCaptionElement) {
        postCaptionElement.textContent = postData.caption || '';
    } else {
        console.warn('No caption element found in the popup');
    }
}

// Update comments in popup
function updateComments(comments) {
    const commentContainer = document.querySelector('.profile__details-comment');

    if (comments && comments.length > 0) {
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('profile__post-comment');
            commentEl.innerHTML = `
                <div class="profile__user-pic" style="background-image: url(${comment.avt})"></div>
                <div class="profile__user-name-caption">
                    <div class="profile__user-name">${comment.username}</div>
                    <div class="profile__user-comment">${comment.content}</div>
                </div>
            `;
            commentContainer.appendChild(commentEl);
        });
    }
}

// Update like information
function updateLikeInfo(postData) {
    const likeCountElement = document.querySelector('.profile__like-count');
    const likePostButton = document.querySelector('.profile__like-post');
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
    const likePostButton = document.querySelector('.profile__like-post');
    const likeIcon = likePostButton.querySelector('svg');
    const likeCountElement = document.querySelector('.profile__like-count');

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

// Shows popup when image is clicked and fetches post details
async function showProfilePopup(imgSrc, postId) {
    // Get popup elements
    const popup = document.getElementById('profileImagePopup');
    const popupImg = document.getElementById('popupImg');

    // Set initial image
    popupImg.src = imgSrc;
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.querySelector('.profile__main-content-profile').style.overflow = 'hidden';

    // Create URL with query parameter postId
    const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/profile?postId=${postId}`;
    history.replaceState(null, '', postUrl);

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

// Close popup function
function closeProfilePopup() {
    document.getElementById('profileImagePopup').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.profile__main-content-profile').style.overflow = 'auto';
    
    // Quay lại URL gốc không có query parameter, không thêm vào lịch sử
    history.replaceState(null, '', 'http://localhost:8080/Social-Network-Project-Instagram/profile');
}



// =========================================================================================================//
// =========================================================================================================//
// =========================================================================================================//



document.addEventListener('DOMContentLoaded', () => {

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

    // Function to render profile details
    function renderProfile(profile) {
        // Update profile picture
        const profilePicture = document.querySelector('.profile__profile-picture img');
        profilePicture.src = profile.avt || "./assets/images/profileImage/default-user.png";

        // Update username
        const username = document.querySelector('.profile__username');
        username.textContent = profile.username || "Unnamed User";

        // Update profile stats
        const postStats = document.querySelector('.profile__profile-stats span:first-child strong');
        const followersStats = document.querySelector('.profile__followers-stats strong');
        const followingStats = document.querySelector('.profile__following-stats strong');

        postStats.textContent = profile.numberOfPost || "0";
        followersStats.textContent = profile.numberOfFollower || "0";
        followingStats.textContent = profile.numberOfFollowing || "0";

        // Update full name and bio
        const fullName = document.querySelector('.profile__full-name');
        const bioText = document.querySelector('.profile__bio-text');

        fullName.textContent = profile.fullname || "No Name";
        bioText.textContent = profile.bio || "No bio available";

        // Render profile posts
        const postGrid = document.querySelector('.explore__explore-grid');
        postGrid.innerHTML = ''; // Clear existing posts

        if (profile.postProfileResponses && profile.postProfileResponses.length > 0) {
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
            postItem.addEventListener('click', () => {
                showProfilePopup(post.postImg, post.postId);
            });
            postGrid.appendChild(postItem);
            });
        } else {
            // Show no posts message if no posts exist
            const noPostsMessage = `
                <div class="profile__no-posts">
                    <div class="profile__camera-icon">
                        <i class="fas fa-camera"></i>
                    </div>
                    <h2>No Posts Yet</h2>
                </div>
            `;
            postGrid.innerHTML = noPostsMessage;
        }
    }

    // Main execution
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
                    throw new Error('Failed to fetch user profile.');
                }
                return response.json();
            })
            .then(data => {
                if (data.result) {
                    renderProfile(data.result);

                } else {
                    console.error('No profile data found');
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                // Optional: Show user-friendly error message
            });
        } else {
            console.error('Invalid token');
        }
    } else {
        console.error('No token found');
        // Optional: Redirect to login page
        window.location.href = 'login.php';
    }
});