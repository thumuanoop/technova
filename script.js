// Pricing data
const pricing = {
    hackathon: [159, 299, 399, 499],
    coding: [139, 199, 199, 199],
    combo: [249, 479, 649, 879]
};

// Registration URLs
const registrationUrls = {
    hackathon: 'https://docs.google.com/forms/d/e/1FAIpQLSe5_d-nMZ1Nu4TtHjnwvgVA-0-_-V7TMRGJ_xgwa4L1K1RndAA/viewform?usp=sf_link',
    coding: 'https://docs.google.com/forms/d/e/1FAIpQLSdFSuZsoyLUoY66d_RwBQKLh6obu8PygfTS3nvUA_jEUsZQ6IQ/viewform?usp=sf_link',
    combo: 'https://docs.google.com/forms/d/e/1FAIpQLSdHl22TIG0KshGu8kLeI3-Ax4QJVD15BbhaNazYtb8xsaVxFQ/viewform?usp=sf_link'
};

let selectedTeamSize = 1;
let selectedRegistrationType = null;

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Team size selection
function selectTeamSize(size) {
    selectedTeamSize = size;
    updateAllPricingDisplays();
}

// Registration type selection
function selectRegistrationType(type) {
    selectedRegistrationType = type;
    updateAllPricingDisplays();
}

// Update pricing display for a specific type and element
function updatePricingDisplay(type, elementId) {
    const pricingElement = document.getElementById(elementId);
    if (!pricingElement) return;

    if (pricing[type] && pricing[type][selectedTeamSize - 1] !== undefined) {
        const price = pricing[type][selectedTeamSize - 1];
        pricingElement.textContent = `Price: $${price}`;
    } else {
        pricingElement.textContent = 'Select a registration type and team size';
    }
}

// Update all pricing displays on the page
function updateAllPricingDisplays() {
    updatePricingDisplay('hackathon', 'pricing-display');
    updatePricingDisplay('coding', 'pricing-display-coding');
    updatePricingDisplay('combo', 'pricing-display-combo');
}

// Handle registration button click
function register(type) {
    if (registrationUrls[type]) {
        window.open(registrationUrls[type], '_blank');
    } else {
        alert('Registration URL not found for this type.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAllPricingDisplays();

    // Attach event listeners to team size buttons
    document.querySelectorAll('.team-size-btn').forEach(button => {
        button.addEventListener('click', () => {
            selectTeamSize(parseInt(button.dataset.size));
        });
    });

    // Attach event listeners to registration type buttons
    document.querySelectorAll('.registration-type-btn').forEach(button => {
        button.addEventListener('click', () => {
            selectRegistrationType(button.dataset.type);
            register(button.dataset.type); // Directly call register with the type
        });
    });

    // Attach event listeners for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
});


