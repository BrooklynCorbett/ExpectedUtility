// ------------------
// Section 3: Expected Utility (with Fixed Probabilities and Dynamic Feedback)
// ------------------

// Fixed probabilities for both investments
const probability1 = 0.25; // 25% chance for Investment Option 1
const probability2 = 0.50; // 50% chance for Investment Option 2

// Initial values for utilities
let utility1 = 50; // Starting utility for $200
let utility2 = 50; // Starting utility for $100

// Function to calculate expected utility for both investments
function calculateExpectedUtility() {
    // Calculate expected utility for each investment
    const expectedUtility1 = probability1 * utility1; // Investment 1: 25% chance of $200
    const expectedUtility2 = probability2 * utility2; // Investment 2: 50% chance of $100

    // Display calculated expected utilities
    document.getElementById('calculatedExpectedUtility1').textContent = expectedUtility1.toFixed(2);
    document.getElementById('calculatedExpectedUtility2').textContent = expectedUtility2.toFixed(2);

    // Update dynamic graph
    updateGraph(expectedUtility1, expectedUtility2);

    // Provide feedback based on both expected utilities
    provideFeedback(expectedUtility1, expectedUtility2);
}

// Reveal sections progressively
document.getElementById('showExample1').addEventListener('click', function() {
    document.getElementById('example1').classList.add('visible');
    document.getElementById('introduction').classList.add('hidden');
});

document.getElementById('showExample2').addEventListener('click', function() {
    document.getElementById('example2').classList.add('visible');
    document.getElementById('example1').classList.add('hidden');
});

document.getElementById('startInteractive').addEventListener('click', function() {
    document.getElementById('interactiveSection').classList.add('visible');
    document.getElementById('example2').classList.add('hidden');
});

// Reveal Step 2 after adjusting Investment 1
document.getElementById('revealStep2').addEventListener('click', function() {
    const step2 = document.getElementById('step2');
    step2.classList.add('visible');
    step2.style.transition = "opacity 0.5s ease-in-out";
    step2.style.opacity = 1;
    document.getElementById('revealStep2').style.display = 'none'; // Hide button after click
});

// Calculate Expected Utility after adjusting both investments
document.getElementById('calculateExpectedUtility').addEventListener('click', function() {
    calculateExpectedUtility();
    document.getElementById('step3').classList.add('visible');
    document.getElementById('calculateExpectedUtility').style.display = 'none'; // Hide button after click
});

// Allow dynamic updates to expected utility and graphs after initial calculation
document.getElementById('utility1').addEventListener('input', function(e) {
    utility1 = parseFloat(e.target.value);
    document.getElementById('utility1Value').textContent = utility1;
    calculateExpectedUtility(); // Recalculate every time the slider changes
});

document.getElementById('utility2').addEventListener('input', function(e) {
    utility2 = parseFloat(e.target.value);
    document.getElementById('utility2Value').textContent = utility2;
    calculateExpectedUtility(); // Recalculate every time the slider changes
});

// Dynamic Feedback Function
function provideFeedback(expectedUtility1, expectedUtility2) {
    let feedbackText = '';

    if (expectedUtility1 > expectedUtility2) {
        feedbackText = "Investment Option 1 has a higher expected utility. Based on your preferences, it might be the better choice.";
    } else if (expectedUtility2 > expectedUtility1) {
        feedbackText = "Investment Option 2 has a higher expected utility. Based on your preferences, this might be the better choice.";
    } else {
        feedbackText = "Both investments have the same expected utility. You may want to choose based on your risk preferences.";
    }

    document.getElementById('feedbackText').textContent = feedbackText;
    document.getElementById('feedback').classList.add('visible');
}

// Dynamic Graph Function
function updateGraph(expectedUtility1, expectedUtility2) {
    const data = [
        {
            x: ['Investment 1', 'Investment 2'],
            y: [expectedUtility1, expectedUtility2],
            type: 'bar',
            marker: {color: ['#1f77b4', '#ff7f0e']}
        }
    ];

    Plotly.newPlot('utilityGraph', data, {title: 'Expected Utility Comparison'});
}
