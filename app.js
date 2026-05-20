// ==========================================================================
// Swiss Mobile Repair - Core Application JavaScript
// ==========================================================================

// Global state variables
let selectedLanguage = 'de';
let selectedIssue = '';
let userLatitude = null;
let userLongitude = null;
let userZip = '';

const branches = [
    {
        id: 'sursee',
        name: 'natelo Sursee',
        address: 'Surseepark 3, Bahnhofstrasse 20, 6210 Sursee',
        postalCode: '6210',
        lat: 47.172917,
        lng: 8.104028,
        phone: '+41 41 921 20 20',
        whatsappPhone: '41419212020',
        directionsUrl: 'https://maps.app.goo.gl/RrSzDYerj1ucfwb26',
        rating: '4.9',
        reviewsCount: 148,
        image: 'assets/store_sursee.png',
        embedUrl: 'https://maps.google.com/maps?q=natelo%20Sursee&output=embed'
    },
    {
        id: 'rapperswil',
        name: 'natelo Rapperswil',
        address: 'Obere Bahnhofstrasse 58, 8640 Rapperswil',
        postalCode: '8640',
        lat: 47.228056,
        lng: 8.819944,
        phone: '+41 55 210 86 40',
        whatsappPhone: '41552108640',
        directionsUrl: 'https://maps.app.goo.gl/b4VzY1ACyj61GPtC6',
        rating: '4.9',
        reviewsCount: 203,
        image: 'assets/store_rapperswil.png',
        embedUrl: 'https://maps.google.com/maps?q=natelo%20Rapperswil&output=embed'
    },
    {
        id: 'muri',
        name: 'natelo Muri',
        address: 'Aarauerstrasse 6, 5630 Muri',
        postalCode: '5630',
        lat: 47.274376,
        lng: 8.341140,
        phone: '+41 56 664 56 30',
        whatsappPhone: '41566645630',
        directionsUrl: 'https://maps.app.goo.gl/KjhbYp9aPhyczfB69',
        rating: '4.9',
        reviewsCount: 92,
        image: 'assets/store_muri.png',
        embedUrl: 'https://maps.google.com/maps?q=natelo%20Muri&output=embed'
    },
    {
        id: 'kuessnacht',
        name: 'natelo Küssnacht',
        address: 'Bahnhofstrasse 38, 6403 Küssnacht',
        postalCode: '6403',
        lat: 47.082778,
        lng: 8.437944,
        phone: '+41 41 850 64 03',
        whatsappPhone: '41418506403',
        directionsUrl: 'https://maps.app.goo.gl/V9PMfURYJjh8ETJy6',
        rating: '4.9',
        reviewsCount: 115,
        image: 'assets/store_kussnacht.png',
        embedUrl: 'https://maps.google.com/maps?q=natelo%20K%C3%BCssnacht&output=embed'
    },
    {
        id: 'emmenbruecke',
        name: 'natelo Emmen',
        address: 'Sonnenplatz 1, 6020 Emmenbrücke',
        postalCode: '6020',
        lat: 47.0761,
        lng: 8.2615,
        phone: '+41 41 260 60 20',
        whatsappPhone: '41412606020',
        directionsUrl: 'https://maps.app.goo.gl/ocEoLbRzqZhEqde56',
        rating: '4.9',
        reviewsCount: 176,
        image: 'assets/store_emmen.webp',
        embedUrl: 'https://maps.google.com/maps?q=natelo%20Emmen&output=embed'
    }
];

// Fallback Swiss coordinates map based on first 2 digits of PLZ for offline/fallback routing
const zipPrefixCoordinates = {
    '10': { lat: 46.5197, lng: 6.6323 }, // Lausanne region
    '12': { lat: 46.2044, lng: 6.1432 }, // Geneva region
    '20': { lat: 46.9900, lng: 6.9293 }, // Neuchâtel
    '30': { lat: 46.9480, lng: 7.4474 }, // Bern
    '40': { lat: 47.5596, lng: 7.5886 }, // Basel
    '50': { lat: 47.3904, lng: 8.0457 }, // Aarau
    '56': { lat: 47.2743, lng: 8.3411 }, // Muri / Aargau
    '60': { lat: 47.0502, lng: 8.3093 }, // Lucerne
    '62': { lat: 47.1720, lng: 8.1070 }, // Sursee
    '64': { lat: 47.0867, lng: 8.4437 }, // Küssnacht
    '70': { lat: 46.8508, lng: 9.5320 }, // Chur
    '80': { lat: 47.3769, lng: 8.5417 }, // Zurich
    '86': { lat: 47.2281, lng: 8.8207 }, // Rapperswil
    '90': { lat: 47.4239, lng: 9.3748 }  // St. Gallen
};

// Bilingual dictionary
const translations = {
    de: {
        'hero-badge': '⚡ Express Reparatur Service',
        'hero-title-1': 'Ihr Smartphone kaputt?',
        'hero-title-2': 'Wir reparieren es sofort.',
        'hero-desc': 'Schnelle, kompetente Handy- und Tablet-Reparaturen an 5 Standorten in der Schweiz oder bequem per Post. Wählen Sie Ihr Problem aus und finden Sie die nächste Filiale.',
        'hero-btn': 'Jetzt Reparatur starten',
        'hero-btn-loc': 'Filialen ansehen',
        'hero-rating-desc': '100K+ Zufriedene Kunden',
        
        'trust-1-title': '#1 Experten-Team',
        'trust-1-desc': 'Ausgebildete Techniker reparieren Ihr Gerät fachgerecht.',
        'trust-2-title': '100K+ Kunden',
        'trust-2-desc': 'Über 100\'000 zufriedene Kunden in der ganzen Schweiz.',
        'trust-3-title': '5 Filialen',
        'trust-3-desc': 'Immer eine Reparaturwerkstatt in Ihrer Nähe.',
        'trust-4-title': 'Bestpreis-Garantie',
        'trust-4-desc': 'Hervorragende Qualität zu unschlagbar günstigen Preisen.',
        'trust-5-title': 'Geräte-Garantie',
        'trust-5-desc': 'Garantie auf alle verbauten Ersatzteile und Reparaturen.',

        'step-1-title': 'Welches Problem hat Ihr Smartphone?',
        'step-1-desc': 'Wählen Sie den Defekt Ihres Geräts aus, um fortzufahren.',
        'step-2-title': 'Wo befinden Sie sich in der Schweiz?',
        'step-2-desc': 'Geben Sie Ihre Postleitzahl ein oder nutzen Sie Ihren aktuellen Standort.',
        'step-3-title': 'Ihre nächstgelegene Filiale',
        'step-3-desc': 'Wählen Sie, wie Sie Ihr Gerät reparieren möchten.',

        'issue-1': 'Displayreparatur',
        'issue-2': 'Akku',
        'issue-3': 'Softwarefehler',
        'issue-4': 'Fehleranalyse',
        'issue-5': 'Werkstattbericht Versicherung',
        'issue-6': 'Datenrettung bei Displayschaden',
        'issue-7': 'Rückseite',
        'issue-8': 'Wasserschaden Analyse',
        'issue-9': 'Datenrettung bei Totalschaden',
        'issue-10': 'Hintere Kamera',
        'issue-11': 'Profi Reinigung',
        'issue-12': 'Anderes Problem',

        'zip-label': 'Postleitzahl (PLZ)',
        'btn-find': 'Filiale Suchen',
        'or': 'oder',
        'btn-geo': 'Standort automatisch ermitteln',
        'nearest-badge': '⭐ Empfohlene Filiale',
        'addr-label': '📍 Adresse:',
        'hours-label': '🕒 Öffnungszeiten:',
        'status-label': '🔋 Status:',

        'badge-fastest': '⚡ Schnellste Antwort',
        'cta-wa-title': 'Per WhatsApp chatten',
        'cta-wa-desc': 'Senden Sie uns Details und erhalten Sie sofort ein Angebot.',
        'btn-wa': 'WhatsApp Nachricht',
        'cta-post-title': 'Per Post einsenden',
        'cta-post-desc': 'Kostenlose Versandmarke ausdrucken und einsenden.',
        'btn-post': 'Einsende-Prozess',
        'cta-visit-title': 'Im Laden vorbeibringen',
        'cta-visit-desc': 'Besuchen Sie uns direkt ohne Termin. Express-Reparatur in 30 Min.',
        'btn-directions': 'Routenplaner',

        'post-heading': 'Postversand-Anleitung',
        'post-s1': 'Verpacken:',
        'post-s1-d': 'Legen Sie Ihr Telefon sicher verpackt in ein Paket.',
        'post-s2': 'Einsenden an:',
        'post-s3': 'Reparatur & Rückversand:',
        'post-s3-d': 'Wir reparieren Ihr Gerät am Tag des Eingangs und senden es versichert zurück. Rechnung liegt bei.',
        'post-label-print': 'Einsendeetikett drucken (Gratis)',

        'all-branches-title': 'Unsere 5 Standorte in der Schweiz',
        'faq-title': 'Häufig gestellte Fragen',
        'faq-q1': 'Wie lange dauert die Reparatur vor Ort?',
        'faq-a1': 'Die meisten Reparaturen wie Display- oder Akkuwechsel erledigen unsere Experten in ca. 30-45 Minuten. Sie können direkt im Surseepark oder den anderen Filialen einkaufen gehen.',
        'faq-q2': 'Muss ich einen Termin vereinbaren?',
        'faq-a2': 'Nein, für unsere Filialbesuche ist kein Termin erforderlich. Kommen Sie einfach während der Öffnungszeiten (bis 19:00 Uhr) vorbei.',
        'faq-q3': 'Welche Garantie erhalte ich auf die Reparatur?',
        'faq-a3': 'Wir geben eine Garantie auf alle verbauten Ersatzteile und unsere Arbeit. Sollte nach der Reparatur etwas nicht funktionieren, beheben wir das Problem kostenfrei.',
        'faq-q4': 'Kann ich mein Gerät auch per Post senden?',
        'faq-a4': 'Ja, nutzen Sie dazu den Button \'Einsende-Prozess\'. Der Rückversand ist versichert und erfolgt am gleichen Tag, an dem das Telefon bei uns eintrifft.',
        
        'footer-disclaimer': 'Alle angegebenen Marken sind Eigentum der jeweiligen Hersteller. Wir sind ein unabhängiger Reparaturbetrieb.',
        'footer-impressum': 'Impressum',
        'footer-datenschutz': 'Datenschutz',
        
        'open-status': 'Jetzt Geöffnet (Schliesst um 19:00)',
        'closed-status': 'Geschlossen (Öffnet morgen um 09:00)',
        'closed-sunday': 'Geschlossen (Öffnet Montag um 09:00)',
        'distance-text': 'Entfernung: {dist} km',
        'error-zip': 'Bitte geben Sie eine gültige 4-stellige Schweizer Postleitzahl ein.',
        'error-geo': 'Standortzugriff verweigert. Bitte geben Sie Ihre PLZ manuell ein.',
        'error-api': 'Postleitzahl nicht gefunden. Bitte versuchen Sie es erneut oder geben Sie eine Nachbar-PLZ ein.',
        'searching-text': '🔍 Suche nach der nächsten Filiale...'
    },
    en: {
        'hero-badge': '⚡ Express Repair Service',
        'hero-title-1': 'Is your smartphone broken?',
        'hero-title-2': 'We repair it instantly.',
        'hero-desc': 'Fast, professional phone and tablet repairs at 5 locations in Switzerland or conveniently by post. Select your issue and find the nearest store.',
        'hero-btn': 'Start Repair Now',
        'hero-btn-loc': 'View Locations',
        'hero-rating-desc': '100K+ Happy Customers',
        
        'trust-1-title': '#1 Expert Team',
        'trust-1-desc': 'Certified technicians repair your device professionally.',
        'trust-2-title': '100K+ Customers',
        'trust-2-desc': 'Over 100,000 satisfied customers across Switzerland.',
        'trust-3-title': '5 Branches',
        'trust-3-desc': 'Always a repair shop close to you.',
        'trust-4-title': 'Best Price Guarantee',
        'trust-4-desc': 'Excellent quality at unbeatable prices.',
        'trust-5-title': 'Device Warranty',
        'trust-5-desc': 'Warranty on all installed parts and repair services.',

        'step-1-title': 'What issue does your phone have?',
        'step-1-desc': 'Select your device\'s issue to proceed.',
        'step-2-title': 'Where are you located in Switzerland?',
        'step-2-desc': 'Enter your Swiss zip code or detect your current location.',
        'step-3-title': 'Your Nearest Branch',
        'step-3-desc': 'Choose how you would like to repair your device.',

        'issue-1': 'Display Repair',
        'issue-2': 'Battery',
        'issue-3': 'Software Failure',
        'issue-4': 'Diagnostic Service',
        'issue-5': 'Insurance Workshop Report',
        'issue-6': 'Data Recovery for Screen Damage',
        'issue-7': 'Back Cover',
        'issue-8': 'Water Damage Diagnostics',
        'issue-9': 'Data Recovery for Total Damage',
        'issue-10': 'Rear Camera',
        'issue-11': 'Professional Cleaning',
        'issue-12': 'Other issue',

        'zip-label': 'Postal Code (ZIP)',
        'btn-find': 'Find Branch',
        'or': 'or',
        'btn-geo': 'Detect My Location Automatically',
        'nearest-badge': '⭐ Recommended Branch',
        'addr-label': '📍 Address:',
        'hours-label': '🕒 Opening Hours:',
        'status-label': '🔋 Status:',

        'badge-fastest': '⚡ Fastest Response',
        'cta-wa-title': 'Chat via WhatsApp',
        'cta-wa-desc': 'Send us your details and receive an immediate quote.',
        'btn-wa': 'WhatsApp Message',
        'cta-post-title': 'Send by Post',
        'cta-post-desc': 'Print your free shipping label and send it in.',
        'btn-post': 'Postal Process',
        'cta-visit-title': 'Bring it to the Store',
        'cta-visit-desc': 'Visit us directly without an appointment. Express repairs in 30 mins.',
        'btn-directions': 'Get Directions',

        'post-heading': 'Postal Shipping Guide',
        'post-s1': 'Pack:',
        'post-s1-d': 'Place your phone securely packed in a shipping box.',
        'post-s2': 'Send to:',
        'post-s3': 'Repair & Return:',
        'post-s3-d': 'We repair your device on the day of arrival and send it back fully insured. Invoice included.',
        'post-label-print': 'Print Free Shipping Label',

        'all-branches-title': 'Our 5 Stores in Switzerland',
        'faq-title': 'Frequently Asked Questions',
        'faq-q1': 'How long does an on-site repair take?',
        'faq-a1': 'Most repairs, such as screen or battery replacements, are done by our experts in about 30-45 minutes. You can go shopping in Surseepark or near our other branches while we work.',
        'faq-q2': 'Do I need to book an appointment?',
        'faq-a2': 'No, no appointment is required for store visits. Just drop by during opening hours (until 7 PM).',
        'faq-q3': 'What kind of warranty do I get?',
        'faq-a3': 'We offer a full warranty on all parts used and our labor. If anything behaves incorrectly post-repair, we fix it free of charge.',
        'faq-q4': 'Can I also mail in my device?',
        'faq-a4': 'Yes, use the "Postal Process" button. Return shipping is fully insured and happens on the same day the phone reaches us.',
        
        'footer-disclaimer': 'All trademarks are property of their respective owners. We are an independent repair service provider.',
        'footer-impressum': 'Imprint',
        'footer-datenschutz': 'Privacy Policy',
        
        'open-status': 'Open Now (Closes at 19:00)',
        'closed-status': 'Closed (Opens tomorrow at 09:00)',
        'closed-sunday': 'Closed (Opens Monday at 09:00)',
        'distance-text': 'Distance: {dist} km',
        'error-zip': 'Please enter a valid 4-digit Swiss postal code.',
        'error-geo': 'Location access denied. Please enter your ZIP code manually.',
        'error-api': 'Postal code not found. Please try again or use a neighboring zip code.',
        'searching-text': '🔍 Searching for the nearest branch...'
    }
};

// ==========================================================================
// Initialization on Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load initial language
    setLanguage('de');
    
    // 2. Render all branches in the sidebar list
    renderAllBranchesList();
    
    // 3. Set up event listener for PLZ enter key
    document.getElementById('zip-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            findNearestByZip();
        }
    });
});

// ==========================================================================
// Language Translation Logic
// ==========================================================================
function setLanguage(lang) {
    selectedLanguage = lang;
    
    // Toggle active classes on header buttons
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[lang][key]) {
            elem.innerText = translations[lang][key];
        }
    });

    // Translate input placeholders
    const zipInput = document.getElementById('zip-input');
    if (lang === 'de') {
        zipInput.placeholder = "Z.B. 6000 oder 8000";
    } else {
        zipInput.placeholder = "E.g., 6000 or 8000";
    }

    // Refresh dynamic states if already computed
    if (selectedIssue) {
        updateWhatsAppLink();
    }
    
    // Recheck open status translation
    branches.forEach(b => {
        const itemStatus = document.getElementById(`status-badge-${b.id}`);
        if (itemStatus) {
            const statusInfo = getStoreOpenStatus(b);
            itemStatus.innerText = statusInfo.text;
            itemStatus.className = `status-badge ${statusInfo.open ? 'open' : 'closed'}`;
        }
    });

    const activeNearestDetails = document.getElementById('nearest-branch-status');
    if (activeNearestDetails && window.currentNearestBranch) {
        const statusInfo = getStoreOpenStatus(window.currentNearestBranch);
        activeNearestDetails.innerText = statusInfo.text;
        activeNearestDetails.className = `status-badge ${statusInfo.open ? 'open' : 'closed'}`;
        
        // Translate distance text
        const distElem = document.getElementById('nearest-branch-distance');
        if (distElem && window.currentDistance !== undefined) {
            distElem.innerText = translations[selectedLanguage]['distance-text'].replace('{dist}', window.currentDistance);
        }
    }
}

// ==========================================================================
// Wizard Step 1: Issue Selection
// ==========================================================================
function selectIssue(element) {
    // Remove selected state from all cards
    document.querySelectorAll('.issue-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Highlight clicked card
    element.classList.add('selected');
    
    // Store selected issue (English label internally, or translated based on UI)
    selectedIssue = element.getAttribute('data-issue');
    
    // Smoothly reveal step 2 and scroll to it
    const locationStep = document.getElementById('location-section');
    locationStep.classList.add('active-step');
    
    setTimeout(() => {
        locationStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Update the WhatsApp URL templates with the selected issue
    updateWhatsAppLink();
}

// ==========================================================================
// Proximity Logic & Calculations
// ==========================================================================

// Calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Get the store open status dynamically
function getStoreOpenStatus(branch) {
    // Current time in Switzerland (UTC+1/2 depending on DST)
    // For standard clients, the browser local time will match their timezone.
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const hour = now.getHours();
    
    const openHour = 9;
    const closeHour = 19; // 19:00 closing time
    
    let isOpen = false;
    let text = '';
    
    if (day === 0) {
        // Sunday: Closed
        isOpen = false;
        text = translations[selectedLanguage]['closed-sunday'];
    } else {
        // Mon-Sat
        if (hour >= openHour && hour < closeHour) {
            isOpen = true;
            text = translations[selectedLanguage]['open-status'];
        } else {
            isOpen = false;
            text = translations[selectedLanguage]['closed-status'];
        }
    }
    
    return { open: isOpen, text: text };
}

// ==========================================================================
// Geolocation & ZIP lookup trigger
// ==========================================================================

function showSearchingState(show) {
    const loader = document.getElementById('searching-loader');
    const zipInput = document.getElementById('zip-input');
    const findBtn = document.getElementById('btn-find-branches');
    const geoBtn = document.getElementById('btn-geolocation');
    const finderBox = document.querySelector('.location-finder-box');
    
    if (show) {
        if (loader) loader.style.display = 'block';
        if (zipInput) zipInput.disabled = true;
        if (findBtn) findBtn.disabled = true;
        if (geoBtn) geoBtn.disabled = true;
        if (finderBox) finderBox.style.opacity = '0.85';
    } else {
        if (loader) loader.style.display = 'none';
        if (zipInput) zipInput.disabled = false;
        if (findBtn) findBtn.disabled = false;
        if (geoBtn) geoBtn.disabled = false;
        if (finderBox) finderBox.style.opacity = '1';
    }
}

function startRepairProcess(event) {
    if (event) event.preventDefault();
    const issueStep = document.getElementById('issue-section');
    issueStep.classList.add('active-step');
    setTimeout(() => {
        issueStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function findNearestByGeolocation() {
    hideError();
    
    if (!navigator.geolocation) {
        showError(translations[selectedLanguage]['error-geo']);
        return;
    }
    
    showSearchingState(true);
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            userZip = 'Geolocation';
            
            setTimeout(() => {
                showSearchingState(false);
                processNearestBranch();
            }, 1500);
        },
        (error) => {
            console.error(error);
            showSearchingState(false);
            showError(translations[selectedLanguage]['error-geo']);
        },
        { timeout: 10000, enableHighAccuracy: true }
    );
}

async function findNearestByZip() {
    hideError();
    const inputVal = document.getElementById('zip-input').value.trim();
    
    showSearchingState(true);
    userZip = inputVal ? inputVal : 'Default';
    
    let coords = null;
    
    if (/^\d{4}$/.test(inputVal)) {
        // Check if we have regional code fallback immediately to maintain instantaneous speeds
        const prefix2 = inputVal.substring(0, 2);
        coords = zipPrefixCoordinates[prefix2] || zipPrefixCoordinates[inputVal.substring(0, 1) + '0'] || null;
        
        try {
            const response = await fetch(`https://api.zippopotam.us/ch/${inputVal}`);
            if (response.ok) {
                const data = await response.json();
                if (data.places && data.places.length > 0) {
                    coords = {
                        lat: parseFloat(data.places[0].latitude),
                        lng: parseFloat(data.places[0].longitude)
                    };
                }
            }
        } catch (e) {
            console.warn("Zippopotam API fetch failed. Using Swiss region routing fallbacks.", e);
        }
    }
    
    if (!coords) {
        // If postcode is invalid or not found, fallback to Emmenbrücke coordinates
        coords = { lat: 47.0761, lng: 8.2615 };
    }
    
    userLatitude = coords.lat;
    userLongitude = coords.lng;
    
    setTimeout(() => {
        showSearchingState(false);
        processNearestBranch();
    }, 1500);
}

function showError(msg) {
    const errorBox = document.getElementById('zip-error');
    errorBox.innerText = msg;
    errorBox.style.display = 'block';
}

function hideError() {
    document.getElementById('zip-error').style.display = 'none';
}

// ==========================================================================
// Nearest Branch Processor
// ==========================================================================
function processNearestBranch() {
    if (userLatitude === null || userLongitude === null) return;
    
    // Calculate distance to all branches
    branches.forEach(b => {
        b.distance = calculateDistance(userLatitude, userLongitude, b.lat, b.lng);
    });
    
    // Sort branches by proximity
    branches.sort((a, b) => a.distance - b.distance);
    
    // Nearest is index 0
    const nearest = branches[0];
    window.currentNearestBranch = nearest;
    window.currentDistance = nearest.distance;
    
    // Update UI elements with nearest details
    updateSelectedBranchUI(nearest);
    
    // Reveal third step (Results panel & Map), FAQ and footer
    const resultsStep = document.getElementById('results-section');
    resultsStep.classList.add('active-step');
    
    document.querySelectorAll('.faq-section, .main-footer').forEach(el => {
        el.classList.add('active-step');
    });
    
    setTimeout(() => {
        resultsStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Highlight the closest branch card in the side list
function highlightBranchItemInSidebar(branchId) {
    document.querySelectorAll('.branch-item-card').forEach(card => {
        card.classList.remove('active-branch');
    });
    
    const activeCard = document.getElementById(`branch-item-${branchId}`);
    if (activeCard) {
        activeCard.classList.add('active-branch');
    }
}

// Format custom WhatsApp text and update link
function updateWhatsAppLink() {
    if (!window.currentNearestBranch) return;
    
    const nearest = window.currentNearestBranch;
    const issueText = selectedIssue ? selectedIssue : (selectedLanguage === 'de' ? 'Gerätedefekt' : 'device defect');
    const zipText = userZip ? userZip : 'Schweiz';
    
    let textMessage = "";
    if (selectedLanguage === 'de') {
        textMessage = `Hallo reparaturvergleich ${nearest.name}, ich möchte mein Smartphone reparieren lassen.\nDefekt: ${issueText}\nPLZ: ${zipText}\nWann kann ich heute für die Express-Reparatur vorbeikommen?`;
    } else {
        textMessage = `Hello reparaturvergleich ${nearest.name}, I would like to get my smartphone repaired.\nIssue: ${issueText}\nZIP Code: ${zipText}\nWhen can I come by today for the express repair?`;
    }
    
    const encodedMessage = encodeURIComponent(textMessage);
    document.getElementById('link-whatsapp').href = `https://wa.me/${nearest.whatsappPhone}?text=${encodedMessage}`;
}

// ==========================================================================
// Interactive Google Map Embed & UI Update
// ==========================================================================
function initOrUpdateMap(focusedBranch) {
    const mapElement = document.getElementById('repair-map');
    if (mapElement && focusedBranch.embedUrl) {
        mapElement.src = focusedBranch.embedUrl;
    }
}

function updateSelectedBranchUI(branch) {
    // Update branch title
    document.getElementById('nearest-branch-name').innerText = branch.name;
    
    // Distance text
    if (branch.distance !== undefined && branch.distance !== null && branch.distance > 0) {
        document.getElementById('nearest-branch-distance').innerText = translations[selectedLanguage]['distance-text'].replace('{dist}', branch.distance);
    } else {
        document.getElementById('nearest-branch-distance').innerText = '';
    }
    
    // Update address
    document.getElementById('nearest-branch-address').innerText = branch.address;
    
    // Update phone link details
    const phoneLink = document.getElementById('nearest-branch-phone-link');
    phoneLink.innerText = branch.phone;
    phoneLink.href = `tel:${branch.phone.replace(/\s+/g, '')}`;
    
    // Update storefront image & rating
    document.getElementById('nearest-branch-image').src = branch.image;
    document.getElementById('nearest-branch-image').alt = branch.name;
    document.getElementById('nearest-branch-rating-text').innerText = `${branch.rating} (${branch.reviewsCount} Rezensionen)`;
    
    // Update status badge
    const statusInfo = getStoreOpenStatus(branch);
    const statusBadge = document.getElementById('nearest-branch-status');
    statusBadge.innerText = statusInfo.text;
    statusBadge.className = `status-badge ${statusInfo.open ? 'open' : 'closed'}`;
    
    // Update address in the post step target details
    document.getElementById('post-target-address').innerText = branch.address;
    
    // Update direct action links
    document.getElementById('link-navigation').href = branch.directionsUrl;
    document.getElementById('link-call').href = `tel:${branch.phone.replace(/\s+/g, '')}`;
    updateWhatsAppLink();
    
    // Update Map
    initOrUpdateMap(branch);
    
    // Highlight closest item in branches list
    highlightBranchItemInSidebar(branch.id);
}

// Render the 5 branches dynamically in the HTML sidebar list
function renderAllBranchesList() {
    const listContainer = document.getElementById('branches-list-container');
    listContainer.innerHTML = '';
    
    // Keep a stable copy sorted alphabetically or as provided by user
    const listBranches = [...branches].sort((a,b) => a.name.localeCompare(b.name));
    
    listBranches.forEach(b => {
        const statusInfo = getStoreOpenStatus(b);
        const card = document.createElement('div');
        card.className = 'branch-item-card';
        card.id = `branch-item-${b.id}`;
        card.onclick = () => selectBranchFromSidebar(b);
        
        card.innerHTML = `
            <div class="branch-item-info">
                <h5>${b.name}</h5>
                <p>${b.address.split(',')[0]}</p>
            </div>
            <span id="status-badge-${b.id}" class="status-badge ${statusInfo.open ? 'open' : 'closed'}">${statusInfo.text.split('(')[0]}</span>
        `;
        
        listContainer.appendChild(card);
    });
}

function selectBranchFromSidebar(branch) {
    // Select this branch as current nearest
    window.currentNearestBranch = branch;
    window.currentDistance = branch.distance || 0;
    
    // Update UI elements
    updateSelectedBranchUI(branch);
}

// Toggle display of post instructions card
function togglePostInstructions() {
    const postCard = document.getElementById('post-instructions-card');
    const isHidden = postCard.style.display === 'none';
    postCard.style.display = isHidden ? 'block' : 'none';
    
    if (isHidden) {
        setTimeout(() => {
            postCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Show all locations directly when CTA is clicked from the Hero section
function showAllBranchesDirectly() {
    // Reveal step 3 directly
    const resultsStep = document.getElementById('results-section');
    resultsStep.classList.add('active-step');
    
    // Reveal faq and footer
    document.querySelectorAll('.faq-section, .main-footer').forEach(el => {
        el.classList.add('active-step');
    });
    
    // Choose the first branch (Sursee) as default view
    const defaultBranch = branches[0];
    window.currentNearestBranch = defaultBranch;
    window.currentDistance = 0;
    
    // Update UI elements
    updateSelectedBranchUI(defaultBranch);
    
    // Scroll to results section
    setTimeout(() => {
        resultsStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}
