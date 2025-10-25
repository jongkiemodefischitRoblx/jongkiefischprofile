// ==============================
// Background Music
// ==============================
const bgMusic = document.getElementById("bgMusic");
document.body.addEventListener("click", () => {
  bgMusic.muted = false;
  bgMusic.play();
});

// ==============================
// Owner System - Device Lock
// ==============================
const OWNER_KEY = "jl_owner_device";
const deviceId = localStorage.getItem(OWNER_KEY) || crypto.randomUUID();
localStorage.setItem(OWNER_KEY, deviceId);
const OWNER_ID = deviceId; // Only this device is owner

// Set Owner Name & Title
const OWNER_NAME = "JL"; // Ganti sesuai nama owner
const OWNER_TITLE = "OWNER 👑"; // Bisa diganti sesuai keinginan

// ==============================
// Notification Container
// ==============================
const notifContainer = document.getElementById("notifContainer");

// ==============================
// Broadcast Message Function
// ==============================
function broadcastMessage(message) {
  if (localStorage.getItem(OWNER_KEY) !== OWNER_ID) return; // bukan owner, tidak bisa

  const notif = document.createElement("div");
  notif.className = "notif";
  notif.innerText = `${OWNER_TITLE} ${OWNER_NAME}: ${message}`;
  notifContainer.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 5000);
}

// ==============================
// Owner Panel (Mobile & Desktop Friendly)
// ==============================
const ownerPanel = document.createElement("div");
ownerPanel.id = "ownerPanel";
ownerPanel.style.cssText = `
  display:none;
  position:fixed;
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
  background:#1a1a1a;
  padding:10px;
  border:2px solid #ffd700;
  border-radius:12px;
  z-index:9999;
  display:flex;
  gap:5px;
`;

const ownerInput = document.createElement("input");
ownerInput.type = "text";
ownerInput.id = "ownerMsg";
ownerInput.placeholder = "Ketik pesan...";
ownerInput.style.cssText = `
  padding:8px;
  border-radius:8px;
  border:none;
  outline:none;
  flex:1;
  background:#0a0a0a;
  color:#ffd700;
`;

const ownerBtn = document.createElement("button");
ownerBtn.innerText = "Kirim";
ownerBtn.style.cssText = `
  padding:8px 12px;
  border:none;
  border-radius:8px;
  background:#ffd700;
  color:#0a0a0a;
  font-weight:600;
  cursor:pointer;
`;

ownerBtn.onclick = () => {
  const msg = ownerInput.value.trim();
  if(msg) {
    broadcastMessage(msg);
    ownerInput.value = "";
  }
};

ownerPanel.appendChild(ownerInput);
ownerPanel.appendChild(ownerBtn);
document.body.appendChild(ownerPanel);

// Tampilkan panel hanya untuk owner
if(localStorage.getItem(OWNER_KEY) === OWNER_ID){
    ownerPanel.style.display = "flex";
}

// ==============================
// Button Hover Animations
// ==============================
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});
