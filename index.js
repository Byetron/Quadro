window.onload = function() {
  // Check if user already verified
  if (localStorage.getItem("verified") === "true") {
    document.getElementById("age-modal").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
};

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.getElementById("submitAge").addEventListener("click", function() {
  const age = parseInt(document.getElementById("age").value);
  const modal = document.getElementById("age-modal");

  if (isNaN(age)) {
    modal.innerHTML = "<p style='color:red;'>Please enter a valid age.</p>";
    return;
  }

  if (age < 10) {
    modal.innerHTML = "<p style='color:red;'>You must be at least 10 years old to access this site.</p>";
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 1500);
  } 
  
  else {
    modal.innerHTML = "<p style='color:green;'>Don't dilly dally!</p>";
    localStorage.setItem("verified", "true");
    setTimeout(() => {
      modal.style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 1500);
  }
});
