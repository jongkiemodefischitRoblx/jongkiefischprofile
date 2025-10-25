// Play music automatically after user interaction for mobile
const bgMusic = document.getElementById("bgMusic");
document.body.addEventListener("click", () => {
  bgMusic.muted = false;
  bgMusic.play();
});

// Owner System - Device Lock
const OWNER_KEY = "jl_owner_device";
const deviceId = localStorage.getItem(OWNER_KEY) || crypto.randomUUID();
localStorage.setItem(OWNER_KEY, deviceId);
const OWNER_ID = deviceId; // Only this device is owner

// Notification container
const notifContainer = document.getElementById("notifContainer");

// Broadcast /all message
function broadcastMessage(message) {
  if (localStorage.getItem(OWNER_KEY) !== OWNER_ID) {
    alert("You are not the owner!");
    return;
  }

  const notif = document.createElement("div");
  notif.className = "notif";
  notif.innerText = message;
  notifContainer.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 5000);
}

// Example: Owner sends message
// To test, type in console: broadcastMessage("/all Halo semuanya!");
window.broadcastMessage = broadcastMessage;

// Button animations
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});
