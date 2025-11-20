// Dashboard JavaScript

// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Load dashboard data
function loadDashboardData() {
    const saved = localStorage.getItem('nutritionLog');
    let dailyLog = [];

    if (saved) {
        dailyLog = JSON.parse(saved);
    }

    // Calculate totals
    const totalCalories = dailyLog.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = dailyLog.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = dailyLog.reduce((sum, item) => sum + item.carbs, 0);
    const totalFats = dailyLog.reduce((sum, item) => sum + item.fats, 0);
    const totalFiber = dailyLog.reduce((sum, item) => sum + item.fiber, 0);
    const avgScore = dailyLog.length > 0
        ? Math.round(dailyLog.reduce((sum, item) => sum + item.healthScore, 0) / dailyLog.length)
        : 0;

    // Update stats
    document.getElementById('dashboardCalories').textContent = totalCalories;
    document.getElementById('dashboardMeals').textContent = dailyLog.length;
    document.getElementById('avgHealthScore').textContent = avgScore || '--';

    // Update calorie progress (goal: 2000)
    const calorieProgress = Math.min((totalCalories / 2000) * 100, 100);
    document.getElementById('calorieProgress').style.width = calorieProgress + '%';

    // Update macro totals
    document.getElementById('proteinTotal').textContent = totalProtein;
    document.getElementById('carbsTotal').textContent = totalCarbs;
    document.getElementById('fatsTotal').textContent = totalFats;
    document.getElementById('fiberTotal').textContent = totalFiber;

    // Update macro progress bars
    document.getElementById('proteinProgress').style.width = Math.min((totalProtein / 50) * 100, 100) + '%';
    document.getElementById('carbsProgress').style.width = Math.min((totalCarbs / 250) * 100, 100) + '%';
    document.getElementById('fatsProgress').style.width = Math.min((totalFats / 65) * 100, 100) + '%';
    document.getElementById('fiberProgress').style.width = Math.min((totalFiber / 25) * 100, 100) + '%';

    // Display recent meals
    displayRecentMeals(dailyLog);
}

// Display recent meals
function displayRecentMeals(meals) {
    const mealsList = document.getElementById('recentMealsList');

    if (meals.length === 0) {
        mealsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>
                <p>No meals logged yet today</p>
                <button class="primary-btn" onclick="window.location.href='index.html#demo'">Scan Your First Meal</button>
            </div>
        `;
        return;
    }

    mealsList.innerHTML = '';

    // Show last 5 meals
    const recentMeals = meals.slice(-5).reverse();

    recentMeals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-item';
        mealItem.innerHTML = `
            <div class="meal-info">
                <div class="meal-name">${meal.name}</div>
                <div class="meal-time">${meal.timestamp}</div>
            </div>
            <div class="meal-calories">${meal.calories} kcal</div>
        `;
        mealsList.appendChild(mealItem);
    });
}

// Set goals function
function setGoals() {
    alert('Goal setting feature coming soon! You can customize your daily calorie and macro targets.');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    loadDashboardData();

    // Refresh data every 30 seconds
    setInterval(loadDashboardData, 30000);
});

// Mobile menu toggle (reuse from main script)
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
