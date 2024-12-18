
// Create post modal
document.addEventListener('DOMContentLoaded', () => {

    const createBtn = document.querySelector('a[data-nav="create"]');
    const modalOverlay = document.querySelector('.create-post__modal-overlay');

    const modal = document.getElementById('create-post-modal');
    const modalBody = document.querySelector('.create-post__create-modal-body');
    const uploadArea = document.getElementById('upload-area');
    const previewArea = document.getElementById('preview-area');
    const captionArea = document.getElementById('caption-area');
    const uploadInput = document.getElementById('upload-image');
    const previewImage = document.getElementById('preview-image');
    const selectButton = document.getElementById('select-from-computer');
    const nextButton = document.getElementById('next-button');
    const backButton1 = document.getElementById('back-button-1');
    const backButton2 = document.getElementById('back-button-2');
    const shareButton = document.getElementById('share-button');


    // Show modal when clicking create button
    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
    });

    // Hide modal when clicking overlay
    modalOverlay.addEventListener('click', () => {
        // Check if preview area is visible
        if (previewArea.style.display === 'block') {
            // If an image has been uploaded, show discard overlay
            discardOverlay.style.display = 'flex';
        } else {
            // If no image has been uploaded, close the modal immediately
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
    
    // Trigger file input click when select button is clicked
    selectButton.addEventListener('click', () => {
        uploadInput.click();
    });

    // Handle image upload
    uploadInput.addEventListener('change', handleImageUpload);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);

    // Handle image upload
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            displayImage(file);
        }
    }

    // Handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Handle drop
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            displayImage(file);
        }
    }

    // Display image
    function displayImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';
            nextButton.style.display = 'block';
            backButton1.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Handle next button click to expand modal
    nextButton.addEventListener('click', () => {
        modal.classList.add('expanded');
        modalBody.classList.add('expanded');
        captionArea.style.display = 'block';
        nextButton.style.display = 'none';
    });

    // Show caption area    
    document.getElementById('next-button').addEventListener('click', function() {
        var captionArea = document.getElementById('caption-area');
        if (captionArea) {
            captionArea.style.display = 'block';
        } else {
            console.error('Element with id "caption-area" not found.');
        }
    });

    // Handle next button click to expand modal
    nextButton.addEventListener('click', () => {
        modal.classList.add('expanded');
        modalBody.classList.add('expanded');
        captionArea.style.display = 'block';
        nextButton.style.display = 'none';
        backButton1.style.display = 'none';
        backButton2.style.display = 'block';
        // Add this line to show share button
        document.getElementById('share-button').style.display = 'block';
    });

    // Hide caption area
    backButton2.addEventListener('click', () => {
        modal.classList.remove('expanded');
        modalBody.classList.remove('expanded');
        captionArea.style.display = 'none';
        nextButton.style.display = 'block';
        backButton1.style.display = 'block';
        backButton2.style.display = 'none';

        document.getElementById('share-button').style.display = 'none';
    });



    // Handle discard button click
    // Thêm các biến mới vào phần khai báo biến
    const discardOverlay = document.querySelector('.create-post__discard-overlay');
    const discardButton = document.getElementById('discard-button');
    const cancelButton = document.getElementById('cancel-button');

    // Thay thế event listener cho backButton1
    backButton1.addEventListener('click', () => {
        discardOverlay.style.display = 'flex';
    });

    // Thêm event listeners cho các nút trong discard modal
    discardButton.addEventListener('click', () => {
        // Reset modal về trạng thái ban đầu
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        discardOverlay.style.display = 'none';
        uploadArea.style.display = 'flex';
        previewArea.style.display = 'none';
        nextButton.style.display = 'none';
        backButton1.style.display = 'none';
        backButton2.style.display = 'none';
        captionArea.style.display = 'none';
        document.getElementById('share-button').style.display = 'none';
        modal.classList.remove('expanded');
        modalBody.classList.remove('expanded');
        previewImage.src = '';
    });

    cancelButton.addEventListener('click', () => {
        discardOverlay.style.display = 'none';
    });

    // Thêm event listeners cho nút share button
    shareButton.addEventListener('click', () => {
        uploadPost();

        // Reset modal về trạng thái ban đầu
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        discardOverlay.style.display = 'none';
        uploadArea.style.display = 'flex';
        previewArea.style.display = 'none';
        nextButton.style.display = 'none';
        backButton1.style.display = 'none';
        backButton2.style.display = 'none';
        captionArea.style.display = 'none';
        document.getElementById('share-button').style.display = 'none';
        modal.classList.remove('expanded');
        modalBody.classList.remove('expanded');
        previewImage.src = '';
        document.getElementById('caption').value = '';
    });

    // Hàm lấy giá trị token từ cookie
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
                return c.substring(name.length, c.length); // Trả về token
            }
        }
        return "";
    }







    //====================================================================================================//
    //====================================================================================================//
    //====================================================================================================//

    //==================================== Create post handle ====================================//



    // Handle image upload
    function uploadPost() {
        const caption = document.getElementById('caption').value; // Get caption from textarea
        const imageInput = document.getElementById('upload-image'); // Access the correct image input
        const imageFile = imageInput.files[0]; // Get the selected image file
        
        if (!imageFile) {
            alert("Please select an image to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append('content', caption);
        formData.append('file', imageFile); // Add the image file to the FormData
        
        // Get token from cookies
        const token = getTokenFromCookie();
        
        if (!token) {
            alert("User is not authenticated.");
            return;
        }
    
        // Make the fetch request to upload the post
        fetch('http://localhost:81/social-network/posts/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Attach token for authorization
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Post created successfully');
            
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the post. Please try again.');
        });
    }                                                           
    
});








//====================================================================================================//
//====================================================================================================//
//====================================================================================================//




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
  function renderUploadUser(data) {
  
    const userPreview = document.querySelector('.create-post__user-info');
    const profileImage = userPreview.querySelector('img');
    const usernameElement = userPreview.querySelector('h4');
  
    // Update profile image (use default if not available)
    profileImage.src = data.avt || 'default-avatar.png'; // Use 'avt' as key for avatar
    
    // Update username and full name
    usernameElement.textContent = data.username || 'Unknown';
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
                    renderUploadUser(data.result);
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
  





