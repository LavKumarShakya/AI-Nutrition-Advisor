// Food Database - Sample foods with nutrition data
const foodDatabase = {
    pizza: {
        name: 'Pizza',
        calories: 285,
        protein: 12,
        carbs: 36,
        fats: 10,
        sugar: 4,
        fiber: 2,
        healthScore: 55,
        suggestions: [
            'Choose whole wheat base for more fiber',
            'Use less cheese to reduce fat content',
            'Add more vegetable toppings',
            'Try homemade version with low oil',
            'Control portion size to 2 slices'
        ]
    },
    burger: {
        name: 'Burger',
        calories: 540,
        protein: 25,
        carbs: 45,
        fats: 28,
        sugar: 8,
        fiber: 2,
        healthScore: 45,
        suggestions: [
            'Choose grilled chicken instead of fried',
            'Use whole grain bun',
            'Add more lettuce and tomatoes',
            'Skip the mayo and cheese',
            'Try veggie burger alternative'
        ]
    },
    salad: {
        name: 'Salad',
        calories: 150,
        protein: 5,
        carbs: 12,
        fats: 8,
        sugar: 4,
        fiber: 5,
        healthScore: 92,
        suggestions: [
            'Great choice! Very healthy',
            'Add grilled chicken for more protein',
            'Use olive oil based dressing',
            'Include variety of colorful vegetables',
            'Add nuts for healthy fats'
        ]
    },
    rice: {
        name: 'Rice Bowl',
        calories: 350,
        protein: 8,
        carbs: 75,
        fats: 2,
        sugar: 1,
        fiber: 2,
        healthScore: 65,
        suggestions: [
            'Switch to brown rice for more fiber',
            'Add protein (chicken, fish, tofu)',
            'Include vegetables for nutrients',
            'Control portion to 1 cup',
            'Avoid fried rice preparations'
        ]
    },
    samosa: {
        name: 'Samosa',
        calories: 262,
        protein: 4,
        carbs: 28,
        fats: 15,
        sugar: 2,
        fiber: 3,
        healthScore: 40,
        suggestions: [
            'Baked version is healthier than fried',
            'Limit to 1-2 pieces',
            'Pair with green chutney instead of tamarind',
            'High in oil - eat occasionally',
            'Try air-fried version at home'
        ]
    },
    dosa: {
        name: 'Dosa',
        calories: 168,
        protein: 4,
        carbs: 28,
        fats: 4,
        sugar: 1,
        fiber: 2,
        healthScore: 75,
        suggestions: [
            'Good healthy choice!',
            'Use less oil while cooking',
            'Add vegetables for masala dosa',
            'Pair with sambar for protein',
            'Fermented food - good for digestion'
        ]
    },
    maggi: {
        name: 'Instant Noodles',
        calories: 385,
        protein: 9,
        carbs: 55,
        fats: 14,
        sugar: 3,
        fiber: 2,
        healthScore: 35,
        suggestions: [
            'High in sodium - consume rarely',
            'Add vegetables to increase nutrition',
            'Use only half the seasoning packet',
            'Try whole wheat noodles instead',
            'Cook with less oil'
        ]
    },
    idli: {
        name: 'Idli',
        calories: 132,
        protein: 4,
        carbs: 25,
        fats: 1,
        sugar: 1,
        fiber: 2,
        healthScore: 85,
        suggestions: [
            'Excellent healthy choice!',
            'Steamed - very low in fat',
            'Pair with sambar for protein',
            'Fermented food aids digestion',
            'Great breakfast option'
        ]
    }
};

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Image Upload Functionality
let currentFoodData = null;

// Hero upload
const heroFileInput = document.getElementById('heroFileInput');
const heroUploadPreview = document.getElementById('heroUploadPreview');

if (heroFileInput) {
    heroFileInput.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], true);
    });
}

// Demo upload
const foodImageInput = document.getElementById('foodImageInput');
const uploadArea = document.getElementById('uploadArea');
const uploadContent = document.getElementById('uploadContent');
const uploadedImage = document.getElementById('uploadedImage');
const analyzeBtn = document.getElementById('analyzeBtn');

if (foodImageInput) {
    foodImageInput.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], false);
    });
}

// Drag and drop functionality
if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent)';
        uploadArea.style.background = 'var(--accent-light)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border)';
        uploadArea.style.background = 'var(--bg-secondary)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border)';
        uploadArea.style.background = 'var(--bg-secondary)';

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file, false);
        }
    });
}

function handleImageUpload(file, isHero) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        if (isHero) {
            // Scroll to demo section
            document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show uploaded image
            uploadContent.style.display = 'none';
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            analyzeBtn.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

// Analyze button click
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        analyzeFoodImage();
    });
}

function analyzeFoodImage() {
    // Simulate AI recognition - randomly select a food
    const foodKeys = Object.keys(foodDatabase);
    const randomFood = foodKeys[Math.floor(Math.random() * foodKeys.length)];
    currentFoodData = foodDatabase[randomFood];

    // Show loading animation
    analyzeBtn.textContent = 'Analyzing...';
    analyzeBtn.disabled = true;

    // Simulate processing time
    setTimeout(() => {
        displayResults(currentFoodData);
        analyzeBtn.textContent = 'Analyze Food';
        analyzeBtn.disabled = false;
    }, 1500);
}

function displayResults(foodData) {
    const resultsSection = document.getElementById('resultsSection');

    // Update food name
    document.getElementById('foodName').textContent = foodData.name;

    // Update health score
    updateHealthScore(foodData.healthScore);

    // Update nutrition values
    document.getElementById('calories').textContent = foodData.calories;
    document.getElementById('protein').textContent = foodData.protein;
    document.getElementById('carbs').textContent = foodData.carbs;
    document.getElementById('fats').textContent = foodData.fats;
    document.getElementById('sugar').textContent = foodData.sugar;
    document.getElementById('fiber').textContent = foodData.fiber;

    // Update suggestions
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    foodData.suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });

    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateHealthScore(score) {
    const scoreText = document.getElementById('scoreText');
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreLabel = document.getElementById('scoreLabel');

    scoreText.textContent = score;

    // Calculate stroke offset (220 is the circumference)
    const offset = 220 - (220 * score / 100);
    scoreCircle.style.strokeDashoffset = offset;

    // Update color based on score
    let color, label;
    if (score >= 71) {
        color = '#10B981'; // Green
        label = 'Excellent';
    } else if (score >= 41) {
        color = '#F59E0B'; // Yellow
        label = 'Good';
    } else {
        color = '#EF4444'; // Red
        label = 'Poor';
    }

    scoreCircle.style.stroke = color;
    scoreText.style.color = color;
    scoreLabel.textContent = label;
    scoreLabel.style.color = color;
}

// Daily Log Functionality
let dailyLog = [];

// Load log from localStorage
function loadDailyLog() {
    const saved = localStorage.getItem('nutritionLog');
    if (saved) {
        dailyLog = JSON.parse(saved);
        updateLogDisplay();
    }
}

// Save log to localStorage
function saveDailyLog() {
    localStorage.setItem('nutritionLog', JSON.stringify(dailyLog));
}

// Add to daily log
const addToLogBtn = document.getElementById('addToLogBtn');
if (addToLogBtn) {
    addToLogBtn.addEventListener('click', () => {
        if (currentFoodData) {
            const logEntry = {
                ...currentFoodData,
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            dailyLog.push(logEntry);
            saveDailyLog();
            updateLogDisplay();

            // Show success message
            addToLogBtn.textContent = '✓ Added to Log';
            setTimeout(() => {
                addToLogBtn.textContent = 'Add to Daily Log';
            }, 2000);
        }
    });
}

// Update log display
function updateLogDisplay() {
    const logItems = document.getElementById('logItems');
    const totalCalories = document.getElementById('totalCalories');
    const totalMeals = document.getElementById('totalMeals');

    if (dailyLog.length === 0) {
        logItems.innerHTML = '<div class="empty-log"><p>No meals logged yet. Start by analyzing a food image!</p></div>';
        totalCalories.textContent = '0';
        totalMeals.textContent = '0';
        return;
    }

    // Calculate totals
    const calorieSum = dailyLog.reduce((sum, item) => sum + item.calories, 0);
    totalCalories.textContent = calorieSum;
    totalMeals.textContent = dailyLog.length;

    // Display log items
    logItems.innerHTML = '';
    dailyLog.forEach((item, index) => {
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        logItem.innerHTML = `
            <div class="log-item-info">
                <h4>${item.name}</h4>
                <p>Logged at ${item.timestamp}</p>
            </div>
            <div class="log-item-calories">${item.calories} kcal</div>
        `;
        logItems.appendChild(logItem);
    });
}

// Clear log
const clearLogBtn = document.getElementById('clearLogBtn');
if (clearLogBtn) {
    clearLogBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your daily log?')) {
            dailyLog = [];
            saveDailyLog();
            updateLogDisplay();
        }
    });
}

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dots .dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }

    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

const testimonialSlider = document.querySelector('.testimonials-slider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load daily log
    loadDailyLog();

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .step-card, .feature-card, .benefit-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button ripple effects
document.querySelectorAll('.primary-btn, .secondary-btn, .nav-cta').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .primary-btn, .secondary-btn, .nav-cta, .upload-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            border-bottom: 1px solid var(--border);
            box-shadow: var(--shadow-lg);
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
