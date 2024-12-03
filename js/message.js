// Account Switch Popup
const userDropdown = document.querySelector('.user-dropdown');
const accountPopup = document.getElementById('account-switch-popup');
const accountCloseBtn = accountPopup?.querySelector('.close-btn');

// Show account popup
if (userDropdown && accountPopup) {
  userDropdown.addEventListener('click', () => {
    accountPopup.classList.remove('hidden');
  });

  // Close account popup
  accountCloseBtn?.addEventListener('click', () => {
    accountPopup.classList.add('hidden');
  });

  // Close popup when clicking outside the content
  window.addEventListener('click', (e) => {
    if (e.target === accountPopup) {
      accountPopup.classList.add('hidden');
    }
  });
}

// New Message Popup
const newMessageBtn = document.querySelector('.new-message-btn');
const messagePopup = document.getElementById('message-popup'); // Assuming you have an element with this ID
const messageCloseBtn = messagePopup?.querySelector('.close-btn');

// Show message popup
if (newMessageBtn && messagePopup) {
  newMessageBtn.addEventListener('click', () => {
    messagePopup.classList.remove('hidden');
  });

  // Close message popup
  messageCloseBtn?.addEventListener('click', () => {
    messagePopup.classList.add('hidden');
  });

  // Close popup when clicking outside the content
  window.addEventListener('click', (e) => {
    if (e.target === messagePopup) {
      messagePopup.classList.add('hidden');
    }
  });
}

document.getElementById('search').addEventListener('input', function () {
  const chatBtn = document.getElementById('chat-btn');
  if (this.value.trim() !== '') {
    chatBtn.disabled = false;
    chatBtn.classList.add('enabled');
  } else {
    chatBtn.disabled = true;
    chatBtn.classList.remove('enabled');
  }
});
