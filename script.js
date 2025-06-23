// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  // Add 'loaded' class to trigger the transition
  preloader.classList.add('loaded');
  // Remove preloader from DOM after transition completes
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500); // This should match your transition duration
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

mobileMenuBtn.addEventListener("click", function() {
  navLinks.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
  
  // Toggle between hamburger and close icon
  const icon = mobileMenuBtn.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking on a link (mobile only)
const navItems = navLinks.querySelectorAll("a");
navItems.forEach(item => {
  item.addEventListener("click", function() {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

// Close menu when clicking outside (mobile only)
document.addEventListener("click", function(event) {
  if (window.innerWidth <= 768 && 
      !navbar.contains(event.target) && 
      !event.target.classList.contains("mobile-menu-btn")) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Check for saved theme preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Close mobile menu when resizing to desktop
window.addEventListener("resize", function() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// ==================== Chatbox Functionality ====================
const chatboxContainer = document.querySelector(".chatbox-container");
const toggleBtn = document.querySelector(".chatbox-toggle-btn");
const closeBtn = document.querySelector(".chatbox-close-btn");
const messageInput = document.querySelector(".chatbox-input-area textarea");
const sendBtn = document.querySelector(".chatbox-send-btn");
const messagesContainer = document.querySelector(".chatbox-messages");
const typingIndicator = document.querySelector(".chatbox-typing-indicator");

// Toggle chatbox visibility
function toggleChatbox() {
  chatboxContainer.classList.toggle("active");
}

// Close chatbox
function closeChatbox() {
  chatboxContainer.classList.remove("active");
}

// Add event listeners for chatbox
if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleChatbox);
}
if (closeBtn) {
  closeBtn.addEventListener("click", closeChatbox);
}

// Message input auto-resize
messageInput.addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// Send message functionality
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText) {
    addMessage(messageText, "user");
    messageInput.value = "";
    messageInput.style.height = "auto";

    typingIndicator.style.display = "flex";

    setTimeout(() => {
      typingIndicator.style.display = "none";
      const response = generateReply(messageText.toLowerCase());
      addMessage(response, "bot");
    }, 2000);
  }
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function generateReply(userInput) {
  if (userInput.includes("skill")) {
    return "My skills include HTML, CSS, JavaScript, SQL, C#, and OOP. I'm also experienced in networking and software engineering.";
  } else if (userInput.includes("experience") || userInput.includes("work")) {
    return "I'm currently a fresher but have built multiple real-world projects to demonstrate my experience.";
  } else if (userInput.includes("project")) {
    return "Some of my projects include a Quiz App, Weather App, Restaurant Management System, AI Maze Solver, and a Hotel Network Simulation.";
  } else if (userInput.includes("education")) {
    return "I'm pursuing a BS in Computer Science at KIET with majors in Web Development and Networking.";
  } else if (userInput.includes("contact") || userInput.includes("email")) {
    return "You can reach me at muzammil.thedeveloper@gmail.com or on LinkedIn: https://www.linkedin.com/in/muhammad-muzammil-7562bb316";
  } else if (userInput.includes("resume")) {
    return "Here's my resume: [Muhammad_Muzammil_Resume.pdf]";
  } else {
    return "Thanks for your message! How else can I assist you?";
  }
}

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `chatbox-message-wrapper ${sender}`;

  const message = document.createElement("p");
  message.textContent = text;

  const timestamp = document.createElement("div");
  timestamp.className = "chatbox-timestamp";
  const now = new Date();
  timestamp.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  wrapper.appendChild(message);
  wrapper.appendChild(timestamp);

  messagesContainer.appendChild(wrapper);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ==================== Filter Buttons Functionality ====================
function setupFilter(sectionSelector, cardSelector, btnSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;
  
  const filterButtons = section.querySelectorAll(btnSelector);
  const cards = section.querySelectorAll(cardSelector);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Apply filtering for both sections
setupFilter("#skills", ".skill-card", ".skills-filter .filter-btn");
setupFilter("#projects", ".project-card", ".projects-filter .filter-btn");

// ==================== Scroll to Top Button ====================
const scrollTopBtn = document.querySelector(".scroll-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ==================== Current Year in Footer ====================
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Project Details Modal Functions
function openProjectDetails() {
  const modal = document.getElementById('projectDetailsModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Scroll to top of modal when opened
  modal.querySelector('div').scrollTo(0, 0);
}

function closeProjectDetails() {
  document.getElementById('projectDetailsModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Contact Form Submission
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const thankYouMessage = document.getElementById("thankYouMessage");
  const userNameSpan = document.getElementById("userName");

  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6kav-4VELxyMtThRQrqBPi6o5xFVYUymC1KuhNkvCG0gKTCp8lvRMC12hXEHvCHe1RQ/exec";

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Set loading state
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector(".btn-text");
    const btnIcon = submitBtn.querySelector(".btn-icon");
    btnText.textContent = "Sending...";
    btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    try {
      const formData = new FormData(form);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Success - show message
        form.style.display = "none";
        userNameSpan.textContent = formData.get("name");
        thankYouMessage.style.display = "block";
      } else {
        throw new Error(result.error || "Submission failed");
      }
      
    } catch (error) {
      console.error("Error:", error);
      
      // Fallback to mailto if Google Script fails
      const mailtoLink = `mailto:muzammil.thedeveloper@gmail.com?subject=${encodeURIComponent(
        form.subject.value
      )}&body=${encodeURIComponent(
        `Name: ${form.name.value}\nEmail: ${form.email.value}\nPhone: ${form.phone.value}\n\n${form.message.value}`
      )}`;
      
      if (confirm("Couldn't send automatically. Open email client instead?")) {
        window.location.href = mailtoLink;
        form.style.display = "none";
        userNameSpan.textContent = form.name.value;
        thankYouMessage.style.display = "block";
      }
      
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
  });

  // Back button handler
  document.getElementById("backBtn").addEventListener("click", function() {
    form.style.display = "block";
    thankYouMessage.style.display = "none";
    form.reset();
  });
});

