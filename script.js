let submitBtn = document.querySelector(".feedback-container>form>#submitBtn");

// Submit event listener
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  sendDataToAPI();
});

// Function to send data to the API
async function sendDataToAPI() {
  try {
    let usernameField = document.querySelector(".feedback-container>form>#name");
    let emailField = document.querySelector(".feedback-container>form>#email");
    let messageField = document.querySelector(".feedback-container>form>#message");

    // Create object to send
    let newComment = {
      username: usernameField.value.trim(),
      email: emailField.value.trim(),
      message: messageField.value.trim()
    };

    // Prevent sending empty fields
    if (!newComment.username || !newComment.email || !newComment.message) {
      alert("Please fill out all fields.");
      return;
    }

    // Send POST request to API
    let response = await fetch("https://689de687ce755fe6978a6eef.mockapi.io/data/testdataobject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    });

    if (!response.ok) {
      throw new Error("Failed to send data to API");
    }

    // Clear input fields
    usernameField.value = '';
    emailField.value = '';
    messageField.value = '';

    // Reload comments after posting
    displayData();

  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Function to get and display all data from API
async function displayData() {
  try {
    let commentSection = document.querySelector("#comment-section");
    commentSection.innerHTML = ''; // Clear existing comments

    let response = await fetch("https://689de687ce755fe6978a6eef.mockapi.io/data/testdataobject");
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    let comments = await response.json();

    comments.forEach(comment => {
      let commentsDiv = document.createElement('div');
      commentsDiv.classList.add('comments');

      let usernameDiv = document.createElement('div');
      usernameDiv.classList.add("username");
      usernameDiv.innerText = comment.username;

      let messageDiv = document.createElement('div');
      messageDiv.classList.add("message");
      messageDiv.innerText = comment.message;

      commentsDiv.append(usernameDiv, messageDiv);
      commentSection.append(commentsDiv);
    });

  } catch (error) {
    console.error("Error displaying data:", error);
  }
}

// Load comments when page loads
document.addEventListener("DOMContentLoaded", displayData);