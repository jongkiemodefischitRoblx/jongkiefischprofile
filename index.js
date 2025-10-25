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

// ----------------------
// Owner Panel (HP friendly)
// ----------------------
const ownerPanel = document.createElement("div");
ownerPanel.id = "ownerPanel";
ownerPanel.style.cssText = "display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#1a1a1a; padding:10px; border:2px solid #ffd700; border-radius:12px; z-index:9999; display:flex; gap:5px;";

const ownerInput = document.createElement("input");
ownerInput.type = "text";
ownerInput.id = "ownerMsg";
ownerInput.placeholder = "Ketik pesan...";
ownerInput.style.cssText = "padding:8px; border-radius:8px; border:none; outline:none; flex:1; background:#0a0a0a; color:#ffd700;";

const ownerBtn = document.createElement("button");
ownerBtn.innerText = "Kirim";
ownerBtn.style.cssText = "padding:8px 12px; border:none; border-radius:8px; background:#ffd700; color:#0a0a0a; font-weight:600; cursor:pointer;";
ownerBtn.onclick = () => {
  const msg = ownerInput.value.trim();
  if(msg) {
    broadcastMessage("/all " + msg);
    ownerInput.value = "";
  }
};

ownerPanel.appendChild(ownerInput);
ownerPanel.appendChild(ownerBtn);
document.body.appendChild(ownerPanel);

// Show panel only for owner device
if(localStorage.getItem(OWNER_KEY) === OWNER_ID){
    ownerPanel.style.display = "flex";
}

// ----------------------
// Button hover animations
// ----------------------
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});
