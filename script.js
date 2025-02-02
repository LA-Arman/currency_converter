const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const exchangeRateText = document.querySelector(".exchange-rate");
const form = document.getElementById("currency-form");

// Country codes with flags
const countryCode = {
    "USD": "US", "NPR": "NP", "INR": "IN", "PKR": "PK", "MAD": "MA",
    "EUR": "FR", "GBP": "GB", "AUD": "AU", "CAD": "CA", "JPY": "JP"
};

// Populate currency dropdowns
Object.keys(countryCode).forEach(code => {
    fromCurrency.innerHTML += `<option value="${code}">${code}</option>`;
    toCurrency.innerHTML += `<option value="${code}">${code}</option>`;
});

// Set default selections
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Update flag images when currency changes
fromCurrency.addEventListener("change", () => {
    fromFlag.src = `https://flagsapi.com/${countryCode[fromCurrency.value]}/flat/64.png`;
});
toCurrency.addEventListener("change", () => {
    toFlag.src = `https://flagsapi.com/${countryCode[toCurrency.value]}/flat/64.png`;
});

// Fetch exchange rate
async function getExchangeRate() {
    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const API_URL = `https://v6.exchangerate-api.com/v6/e62372c810c2bbff51b45e49/latest/${fromCurrency.value}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency.value];
        const total = (amount * rate).toFixed(2);
        exchangeRateText.textContent = `${amount} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
    } catch (error) {
        exchangeRateText.textContent = "Error fetching data";
    }
}

// Fetch rate when button is clicked
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getExchangeRate();
});
