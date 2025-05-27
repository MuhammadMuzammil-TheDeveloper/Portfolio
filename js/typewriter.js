document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const texts = ["Muhammad Muzammil", "Web Developer", "CS Student", "Network Specialist"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
});