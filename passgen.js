const result = document.getElementById("generatedpassword");
const lengthEl = document.getElementById("numberofcharacters");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generatepassword");
const copytoclipboard = document.getElementById("copy");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33,47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123,126));

copytoclipboard.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = result.innerText;

    if(!password) { return alert("Password Field is empty")};

    textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
})

generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    result.innerText = generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols);
})

function generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols) {
    let charCodes = [];
    if(hasUpper) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if(hasLower) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    if(hasNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if(hasSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

    const passwordCharacters = [];

    for(let i = 0; i < length; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }

    return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for(let i = low; i <= high; i++) {
        array.push(i)
    }
    return array;
}