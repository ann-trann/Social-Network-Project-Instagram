// Utility function to get token from cookie
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

// Function to decode JWT token
function decodeJWTToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// Function to render user profile data
function renderSidebarUser(data) {
  const userPreview = document.getElementById("profile-btn");
  const profileImage = userPreview.querySelector("img");

  // Update profile image (use default if not available)
  profileImage.src = data.avt || "default-avatar.png"; // Use 'avt' as key for avatar

}

// Function to update user preview
function updateUserSidebar() {
  const token = getTokenFromCookie();

  if (token) {
    const decodedToken = decodeJWTToken(token);

    if (decodedToken && decodedToken.sub) {
      const userId = decodedToken.sub;

      // Fetch user profile data
      fetch(`http://localhost:81/social-network/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            renderSidebarUser(data.result);
          } else {
            console.error("No user details found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      console.error("Invalid token or missing user ID");
    }
  } else {
    console.error("No token found");
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateUserSidebar);




//================================================================================================
//================================================================================================




// Function to render user profile data
function renderSidebarSmallUser(data) {
  const userPreview = document.getElementById("profile-btn-small");
  const profileImage = userPreview.querySelector("img");

  // Update profile image (use default if not available)
  profileImage.src = data.avt || "default-avatar.png"; // Use 'avt' as key for avatar

}

// Function to update user preview
function updateUserSidebarSmall() {
  const token = getTokenFromCookie();

  if (token) {
    const decodedToken = decodeJWTToken(token);

    if (decodedToken && decodedToken.sub) {
      const userId = decodedToken.sub;

      // Fetch user profile data
      fetch(`http://localhost:81/social-network/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            renderSidebarSmallUser(data.result);
          } else {
            console.error("No user details found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      console.error("Invalid token or missing user ID");
    }
  } else {
    console.error("No token found");
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateUserSidebarSmall);
