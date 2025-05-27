document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Validate form
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (!subject.value.trim()) {
                document.getElementById('subject-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                document.getElementById('message-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                submitText.textContent = 'Sending...';
                submitSpinner.classList.remove('hidden');
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    // Hide loading state
                    submitText.textContent = 'Send Message';
                    submitSpinner.classList.add('hidden');
                    submitBtn.disabled = false;
                    
                    // Show success message
                    formSuccess.classList.remove('hidden');
                    formError.classList.add('hidden');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});