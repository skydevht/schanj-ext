var mainCurrency = 'us';
var currentBank = 1; // Can't be zero
var rateType = 'buy'; // Whether the bank is selling or buying foreign

var inputCurrency = document.querySelector('#input .currency');
var inputEntry = document.querySelector('#input input');

var displayCurrency = document.querySelector('#display .currency');
var displayResult = document.querySelector('#display .result');

var bankSelector = document.querySelector('#rate-selector select');
var buyButton = document.querySelector('#rate-selector .type button:first-child');
var sellButton = document.querySelector('#rate-selector .type button:last-child');

function changeCurrency() {
  if (mainCurrency == 'us') {
    mainCurrency = 'htg';
    inputCurrency.textContent = 'HTG'
    displayCurrency.textContent = 'US'
  } else {
    mainCurrency = 'us';
    inputCurrency.textContent = 'US'
    displayCurrency.textContent = 'HTG'
  }
}

inputCurrency.addEventListener('click', changeCurrency);
displayCurrency.addEventListener('click', changeCurrency);

buyButton.addEventListener('click', function () {
  rateType = 'buy';
  buyButton.className = 'active';
  sellButton.className = '';
});

sellButton.addEventListener('click', function () {
  rateType = 'sell';
  sellButton.className = 'active';
  buyButton.className = '';
});

