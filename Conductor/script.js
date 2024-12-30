const stops = {
    green: ["Mathikade", "Yeshawantpur", "Rajajinagar", "Majestic", "Jayanagar", "Banashankari", "KR Market"],
    purple: ["Majestic", "MG Road", "Indiranagar", "Byappanahalli", "Vijaynagar", "Whitefield"],
};

const availableSeats = {
    green: [50, 50, 50, 50, 50, 50, 50],
    purple: [50, 50, 50, 50, 50, 50],
};

function populateStops() {
    const line = document.getElementById('line').value;
    const origin = document.getElementById('origin');
    const destination = document.getElementById('destination');

    origin.innerHTML = '';
    destination.innerHTML = '';

    stops[line].forEach((stop, index) => {
        const optionOrigin = document.createElement('option');
        optionOrigin.value = index;
        optionOrigin.textContent = stop;

        const optionDestination = document.createElement('option');
        optionDestination.value = index;
        optionDestination.textContent = stop;

        origin.appendChild(optionOrigin);
        destination.appendChild(optionDestination);
    });
}

function calculateFare() {
    const line = document.getElementById('line').value;
    const originIndex = parseInt(document.getElementById('origin').value, 10);
    const destinationIndex = parseInt(document.getElementById('destination').value, 10);
    const passengers = parseInt(document.getElementById('passengers').value, 10);

    if (originIndex === destinationIndex) {
        document.getElementById('result').innerHTML = `<p>Origin and destination cannot be the same!</p>`;
        return;
    }

    const stopsTravelled = Math.abs(destinationIndex - originIndex);
    const farePerPassenger = stopsTravelled * 5;
    const totalFare = farePerPassenger * passengers;

    if (passengers > availableSeats[line][originIndex]) {
        document.getElementById('result').innerHTML = `<p>Not enough seats available. Only ${availableSeats[line][originIndex]} seats left.</p>`;
        return;
    }

    // Display result and payment button
    document.getElementById('result').innerHTML = `
        <h3>Fare Details</h3>
        <p>Line: <strong>${line === 'green' ? 'Green Line' : 'Purple Line'}</strong></p>
        <p>Origin: <strong>${stops[line][originIndex]}</strong></p>
        <p>Destination: <strong>${stops[line][destinationIndex]}</strong></p>
        <p>Stops Travelled: <strong>${stopsTravelled}</strong></p>
        <p>Fare per Passenger: <strong>₹${farePerPassenger}</strong></p>
        <p>Total Passengers: <strong>${passengers}</strong></p>
        <p><strong>Total Fare: ₹${totalFare}</strong></p>
        <button onclick="makePayment('${line}', ${originIndex}, ${passengers})">Proceed to Payment</button>
    `;
}

function makePayment(line, originIndex, passengers) {
    // Deduct seats and redirect to payment page
    availableSeats[line][originIndex] -= passengers;
    window.location.href = 'payment.html';
}

// Initialize stops on page load
document.getElementById('line').addEventListener('change', populateStops);
window.onload = populateStops;
