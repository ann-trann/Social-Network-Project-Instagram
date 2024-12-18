document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch users who liked the post
    async function fetchUsersLikedPost(postId) {
        try {
            const response = await fetch(`http://localhost:81/social-network/posts/people-like-post/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users who liked the post');
            }

            const data = await response.json();
            console.log('Users who liked the post:', data.result);
            return data.result;
        } catch (error) {
            console.error('Error fetching likes:', error);
            return [];
        }
    }

    // Function to create likes overlay
    async function createLikesOverlay(postId) {
        // Fetch users who liked the post
        const usersLikedPost = await fetchUsersLikedPost(postId);

        // Create the overlay element
        const overlay = document.createElement('div');
        overlay.className = 'home_like-overlay';
        overlay.style.display = 'flex';

        // Create the likes container
        const likesContainer = document.createElement('div');
        likesContainer.className = 'home_like';

        // Create header
        const header = document.createElement('div');
        header.className = 'home_like-header';
        header.innerHTML = `
            <h3>Likes</h3>
            <a class="home_like-close-btn"><i class="fas fa-times"></i></a>
        `;

        // Create likes list
        const likesList = document.createElement('div');
        likesList.className = 'like__list-followers';

        // Populate likes list with fetched users
        usersLikedPost.forEach(user => {
            const likeItem = document.createElement('div');
            likeItem.className = 'home_like-item';
            likeItem.innerHTML = `
                <div class="home_like-pic" style="background-image: url(${user.avatar || 'default-avatar.png'})"></div>
                <div class="home_like-info">
                    <h4>${user.username}</h4>
                    <p>${user.fullname || ''}</p>
                    ${user.isFollow 
                        ? '<button class="follow-btn following">Following</button>' 
                        : '<button class="follow-btn">Follow</button>'}
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
        const closeButton = overlay.querySelector('.home_like-close-btn');
        closeButton.addEventListener('click', () => {
            overlay.remove();
        });

        // Close when clicking outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        // Add follow/unfollow functionality
        const followButtons = overlay.querySelectorAll('.follow-btn');
        followButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const userInfo = button.closest('.home_like-info');
                const username = userInfo.querySelector('h4').textContent;
                
                // TODO: Implement follow/unfollow logic
                // This would typically involve a fetch request to your backend
                button.classList.toggle('following');
                button.textContent = button.classList.contains('following') ? 'Following' : 'Follow';
            });
        });
    }

    // Add click event listeners to all likes elements
    function addLikesEventListeners() {
        const postsContainer = document.querySelector('.home__posts-container');
        postsContainer.addEventListener('click', (e) => {
            const likesElement = e.target.closest('.home__likes');
            if (likesElement) {
                // Get the postId from the parent post element
                const postId = likesElement.closest('.home__instagram-post').id;
                createLikesOverlay(postId);
            }
        });
    }

    // Initial setup
    addLikesEventListeners();
});