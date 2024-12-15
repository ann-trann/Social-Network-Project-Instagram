document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.home__caption').forEach(caption => {
        // Simple condition to check if text is too long
        if (caption.scrollHeight > caption.clientHeight) {
            // Create More span
            const moreSpan = document.createElement('span');
            moreSpan.classList.add('home__caption-more');
            moreSpan.textContent = 'More';
            
            // Add click event
            moreSpan.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event bubbling
                
                // Toggle expanded class
                caption.classList.toggle('expanded');
                
                // Update button text
                moreSpan.textContent = caption.classList.contains('expanded') 
                    ? 'Less' 
                    : 'More';
            });
            
            // Append the "More" span
            caption.appendChild(moreSpan);
        }
    });
});
