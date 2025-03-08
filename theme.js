// Check if a theme is saved in localStorage
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
    const icon = document.getElementById("theme-toggle");
    if (currentTheme === "dark") {
        icon.classList.replace('ri-moon-fill', 'ri-sun-fill');
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === "dark") {
        document.body.setAttribute('data-theme', "light");
        localStorage.setItem('theme', "light"); // Store theme in localStorage
        document.getElementById("theme-toggle").classList.replace('ri-sun-fill', 'ri-moon-fill');
    } else {
        document.body.setAttribute('data-theme', "dark");
        localStorage.setItem('theme', "dark"); // Store theme in localStorage
        document.getElementById("theme-toggle").classList.replace('ri-moon-fill', 'ri-sun-fill');
    }
}
function footer(){
document.getElementById("year").textContent = new Date().getFullYear();}
footer()