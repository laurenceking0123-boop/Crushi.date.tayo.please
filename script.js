const noBtn = document.getElementById('noBtn');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');
const screen5 = document.getElementById('screen5');

// Global Data Holders
let chosenDate = "";
let chosenTime = "";

// Swabeng fade out at fade in selector utility function
function changeScreen(fromScreen, toScreen) {
    fromScreen.style.opacity = '0';
    fromScreen.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        fromScreen.style.display = 'none';
        toScreen.style.display = 'flex'; 
        toScreen.style.flexDirection = 'column';
        toScreen.style.alignItems = 'center';
        
        setTimeout(() => {
            toScreen.style.opacity = '1';
            toScreen.style.transform = 'scale(1)';
        }, 50);
    }, 450);
}

// 1. Click "Yes" -> Lipat sa Date Screen
function goToScreen2() {
    noBtn.style.display = 'none'; 
    changeScreen(screen1, screen2);
}

// 2. Click "Next" sa Date Screen -> Lipat sa Time Screen
function goToScreen3() {
    const dateInputVal = document.getElementById('dateInput').value;
    
    if (dateInputVal) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        chosenDate = new Date(dateInputVal).toLocaleDateString('en-US', options);
    } else {
        chosenDate = "A special day";
    }
    
    changeScreen(screen2, screen3);
}

// 3. Click "Next" sa Time Screen -> Lipat sa Location Screen
function goToScreen4() {
    const timeInputVal = document.getElementById('timeInput').value;
    
    if (timeInputVal) {
        const [hours, minutes] = timeInputVal.split(':');
        const hourInt = parseInt(hours, 10);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHours = hourInt % 12 || 12;
        chosenTime = `${formattedHours}:${minutes} ${ampm}`;
    } else {
        chosenTime = "7:00 PM";
    }

    changeScreen(screen3, screen4);
}

// 4. Click "Send it" sa Location Screen -> I-compile lahat at lipat sa Final Screen
function goToScreen5() {
    const locationInputVal = document.getElementById('locationInput').value;

    // I-inject ang mga kinuha nating values sa inner HTML nodes ng dulo
    document.getElementById('chosenDateTime').innerHTML = `${chosenDate} at ${chosenTime}`;
    document.getElementById('chosenLocation').innerHTML = locationInputVal;

    changeScreen(screen4, screen5);
}

// ==========================================
// RUNAWAY DODGE LOGIC (6 FIXED SPOTS)
// ==========================================
let lastSpotIndex = -1;

function dodgeButton(event) {
    if (event) {
        event.preventDefault(); // Hinaharangan ang default click o tap sa mobile
    }

    // Sa unang subok na i-hover o i-tap, kusa nating gagawing absolute ang position nito
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    const btnContainer = document.querySelector('.btn-container').getBoundingClientRect();
    
// 6 FIXED SPOTS: Ini-adjust ang Y values para pantay ang awang sa itaas at ibaba ng white box
    const spots = [
        { x: -120, y: -290 }, // Spot 1: Top-Left (Inilayo nang kaunti para hindi dumikit sa box)
        { x: 0,    y: -290 }, // Spot 2: Top-Center
        { x: 120,  y: -290 }, // Spot 3: Top-Right
        { x: -120, y: 110  }, // Spot 4: Bottom-Left (Inilapit nang kaunti para pantay ang spacing sa taas)
        { x: 0,    y: 110  }, // Spot 5: Bottom-Center
        { x: 120,  y: 110  }  // Spot 6: Bottom-Right
    ];

    let randomIndex;
    
    // Siguraduhin na hindi uulitin ang huling spot para laging gumagalaw
    do {
        randomIndex = Math.floor(Math.random() * spots.length);
    } while (randomIndex === lastSpotIndex);

    lastSpotIndex = randomIndex;
    const chosenSpot = spots[randomIndex];

    // I-apply ang bagong posisyon gamit ang transform
    noBtn.style.transform = `translate(${chosenSpot.x}px, ${chosenSpot.y}px)`;
}

// MGA EVENT LISTENERS
noBtn.addEventListener('mouseover', dodgeButton);
noBtn.addEventListener('touchstart', dodgeButton, { passive: false });
noBtn.addEventListener('click', dodgeButton); // Kahit matyambahang ma-click, iiwas pa rin!