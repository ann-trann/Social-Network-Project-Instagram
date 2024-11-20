<div class="modal-overlay"></div>
<div id="create-post-modal" class="create-modal">
    <div class="create-modal-content">

        <div class="create-modal-header">
            <button id="back-button-1" class="back-button" style="display:none;">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/back_arrow.svg') ?>
            </button>

            <button id="back-button-2" class="back-button" style="display:none;">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/back_arrow.svg') ?>
            </button>

            <h2>Create new post</h2>
            <button id="next-button" class="next-button" style="display:none;">Next</button>
            <button id="share-button" class="share-button" style="display:none;">Share</button>
        </div>

        <div class="create-modal-body" >
            <input type="file" id="upload-image" accept="image/*" style="display:none;">
            
            <div id="upload-area" class="upload-area">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/upload_image.svg') ?>
                <p>Drag photos and videos here</p>
                <button id="select-from-computer">Select from computer</button>
            </div>

            <div id="preview-area" class="preview-area" style="display:none;">
                <img id="preview-image" src="" alt="Preview">
            </div>

            <div class="caption-area" id="caption-area" style="display:none;">
                <div class="user-info">
                    <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
                    <span>username</span>
                </div>
                <textarea id="caption" placeholder="Write a caption..."></textarea>
            </div>
        </div>
        
    </div>
</div>

<div class="discard-overlay" style="display:none;">
    <div class="discard-modal">
        <h3>Discard post?</h3>
        <p>If you leave, your edits won't be saved.</p>
        <div class="discard-buttons">
            <button id="discard-button">Discard</button>
            <button id="cancel-button">Cancel</button>
        </div>
    </div>
</div>

