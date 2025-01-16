document.addEventListener('DOMContentLoaded', () => {
    const words = ["Utvecklare", "Designer", "Buggjägare", "Teknik fantast"]; 
    const typewriter = document.querySelector('.typewriter');
    let wordIndex = 0; 
    let charIndex = 0; 
    let isDeleting = false; 

    const typingSpeed = 100; 
    const deletingSpeed = 100;
    const delayBetweenWords = 2000; 
    const startDelay = (1000)*11; 

    function type() {
        const currentWord = words[wordIndex];
        if (!isDeleting) {
            
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                
                isDeleting = true;
                setTimeout(type, delayBetweenWords);
                return;
            }
        } else {
            
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; 
            }
        }

        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    
    setTimeout(() => {
        type();
    }, startDelay);
});
