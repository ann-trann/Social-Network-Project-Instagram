
// Create post modal
document.addEventListener('DOMContentLoaded', () => {

    const createBtn = document.querySelector('a[data-nav="create"]');
    const modalOverlay = document.querySelector('.modal-overlay');

    const modal = document.getElementById('create-post-modal');
    const modalBody = document.querySelector('.create-modal-body');
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
        console.log("captionArea", captionArea);
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
    const discardOverlay = document.querySelector('.discard-overlay');
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
});
