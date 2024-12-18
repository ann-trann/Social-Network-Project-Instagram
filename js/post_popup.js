//================================================================================================//
//==================================== Handler global popup =======================================//
//================================================================================================//




// Helper functions to create liked/unliked SVGs (if not already defined)
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



// Update user details in popup
function updateUserDetails(postData) {
    const userPicElements = document.querySelectorAll(".global__user-pic");
    const userNameElements = document.querySelectorAll(".global__user-name");
    const postCaptionElement = document.querySelector(".global__user-caption");
    const popupImg = document.getElementById("popupImg");

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



// Shows popup when image is clicked and fetches post details
async function showPopup(postId, page) {
    console.log("page: ", page);

    // Get popup elements
    const popup = document.getElementById("imagePopup");
    const likeButton = popup.querySelector('.global__like-post');
    const likeCount = popup.querySelector('.global__like-count');

    // Set postId attribute on the popup
    popup.setAttribute("postId", postId);

    // Set initial image
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.querySelector(`.${page}__main-content-${page}`).style.overflow = "hidden";

    // Lấy user_id từ URL hiện tại
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    // Tạo URL mới giữ user_id và thêm postId
    const postUrl = userId 
        ? `http://localhost:8080/Social-Network-Project-Instagram/${page}?user_id=${userId}&postId=${postId}`
        : `http://localhost:8080/Social-Network-Project-Instagram/${page}?postId=${postId}`;
    history.replaceState(null, "", postUrl);

    try {
        // Fetch post details
        const postData = await fetchPostDetails(postId);

        // Update popup content
        updateUserDetails(postData);

        // Update like button attributes
        likeButton.setAttribute('data-liked', postData.like);
        likeButton.setAttribute('data-post-id', postId);
        likeCount.textContent = `${postData.numberOfLike} likes`;

        // Update SVG based on like state
        likeButton.innerHTML = postData.like 
            ? createLikedSvg() 
            : createUnlikedSvg();

        updateComments(postData.commentInPostResponseList);

    } catch (error) {
        console.error("Error updating popup:", error);
    }
}


// Close popup function
function closePopup(page) {
    // Ẩn popup
    const popup = document.getElementById("imagePopup");
    popup.style.display = "none";

    // Cho phép cuộn lại trên trang
    document.body.style.overflow = "auto";

    // Nếu tên page có tham số, loại bỏ chúng trước khi sử dụng làm selector
    const sanitizedPage = page.split('?')[0]; // Lấy phần trước dấu '?' trong page
    const mainContent = document.querySelector(`.${sanitizedPage}__main-content-${sanitizedPage}`);
    if (mainContent) {
        mainContent.style.overflow = "auto";
    }

    // Lấy các tham số từ URL hiện tại
    const urlParams = new URLSearchParams(window.location.search);

    // Xóa postId khỏi URL
    urlParams.delete('postId');

    // Tạo URL mới chỉ chứa các tham số còn lại
    const newUrl = `http://localhost:8080/Social-Network-Project-Instagram/${sanitizedPage}?${urlParams.toString()}`;

    // Cập nhật URL
    history.replaceState(null, "", newUrl);

    console.log("Popup closed", newUrl);

    // Xóa các phần tử trong popup (nếu có)
    const commentElements = popup.querySelectorAll('.global__post-comment');
    commentElements.forEach(el => el.remove());
}




//================================================================================================//
//================================ Handler like and like popup ===================================//
//================================================================================================//



// Like handling functionality
async function handleLikePostPopUp(postId, isCurrentlyLiked) {
    const token = getTokenFromCookie();

    // Lấy phần tử popup dựa trên ID
    const popup = document.getElementById('imagePopup');
    
    if (!popup) {
        console.error('Popup not found');
        return null;
    }

    // Lấy nút like từ popup
    const likePostButton = popup.querySelector(`.global__details-action-icons .global__like-post[data-post-id="${postId}"]`);
    if (!likePostButton) {
        console.error(`Like button for post ${postId} not found in popup`);
        return null;
    }

    // Lấy phần tử đếm số lượng like từ popup
    const likeCountElement = popup.querySelector('.global__like-count');
    if (!likeCountElement) {
        console.error('Like count element not found in popup');
        return null;
    }

    // Lấy số lượng like hiện tại
    let currentLikes = parseInt(likeCountElement.textContent.split(" ")[0]) || 0;
    console.log("postIdpopup: ", postId);

    // Cập nhật UI một cách tối ưu ngay lập tức
    try {
        // Gửi request like/unlike tới server
        const response = await fetch(`http://localhost:81/social-network/posts/${postId}/like`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: isCurrentlyLiked ? "UNLIKE" : "LIKE" }),
        });

        if (!response.ok) {
            throw new Error("Failed to like/unlike post");
        }

        // Cập nhật UI dựa trên trạng thái hiện tại
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

        // Khôi phục UI nếu yêu cầu server thất bại
        return null;
    }
}


// Add event listeners to all like buttons on the page
function addLikePopupEventListeners() {
    document.querySelectorAll(".global__like-post").forEach((likeButton) => {
    likeButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        
        const postId = likeButton.getAttribute("data-post-id");
        const isCurrentlyLiked = likeButton.getAttribute("data-liked") === "true";
        
        await handleLikePostPopUp(postId, isCurrentlyLiked);
    });
    });
}

// Initialize like event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", addLikePopupEventListeners);



//================================================================================================//

function updateComments(comments) {
    const commentContainer = document.querySelector('.global__details-comment');
    
    // Clear existing comments
    const postCommentSection = commentContainer.querySelector('.global__post-comment');
    if (postCommentSection) {
    }

    if (comments && comments.length > 0) {
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('global__post-comment');
            commentEl.innerHTML = `
                <div class="global__user-pic" style="background-image: url(${comment.avt})"></div>
                <div class="global__user-name-caption">
                    <div class="global__user-name">${comment.username}</div>
                    <div class="global__user-comment">${comment.content}</div>
                </div>
            `;
            commentContainer.appendChild(commentEl);
        });
    }
}

// ============================================ Handle comment ============================================ //
// Handle comment
async function commentPostPopup(postId) {
    const token = getTokenFromCookie();
    const popup = document.getElementById('imagePopup');
    const commentInput = popup.querySelector('.global__comment-input');
    const commentContent = commentInput.value.trim();

    if (!commentContent) {
        console.error('Comment content is empty');
        return;
    }

    try {
        const response = await fetch(`http://localhost:81/social-network/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: commentContent }),
        });

        if (!response.ok) {
            throw new Error("Failed to comment on post");
        }

        // Clear the comment input
        commentInput.value = '';

        // Fetch post details again to update comments
        const postData = await fetchPostDetails(postId);
        updateComments(postData.commentInPostResponseList);

    } catch (error) {
        console.error("Error commenting on post:", error);
    }
}

















