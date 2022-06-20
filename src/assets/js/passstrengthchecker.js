const strengthMeter = document.getElementById("strength-meter");
const password = document.getElementById("password-input");
const criteriaContainer = document.getElementById("criteria");
const iconToggle = document.getElementById("icon");

password.addEventListener("input", updateStrengthMeter);
// updateStrengthMeter();

iconToggle.addEventListener("click", () => {
    if(password.type === "password") {
        password.type = "text";
        iconToggle.classList.remove("fa-eye-slash");
        iconToggle.classList.add("fa-eye");
    } else if(password.type === "text") {
        password.type = "password";
        iconToggle.classList.remove("fa-eye");
        iconToggle.classList.add("fa-eye-slash");
    }
})

function updateStrengthMeter() {
    const criterias = calculatePasswordStrength(password.value);
    let strength = 100;
    criteriaContainer.innerHTML = "",
    criterias.forEach(criteria => {
        if(criteria == null) return
        strength -= criteria.criticality;
        const criteriaEl = document.createElement("div");
        criteriaEl.innerText = criteria.message;
        criteriaContainer.appendChild(criteriaEl);
    })
    strengthMeter.style.setProperty("--strength-value", strength);
}

function calculatePasswordStrength(password) {
    const criterias = [];
    criterias.push(lengthCriteria(password));
    criterias.push(lowerCaseCharsCriteria(password));
    criterias.push(upperCaseCharsCriteria(password));
    criterias.push(numericalCharsCriteria(password));
    criterias.push(specialCharsCriteria(password));
    criterias.push(repeatingCharacterCriteria(password));
    return criterias;
}

function lengthCriteria(password) {
    const length = password.length;
    if(length <= 5) {
        return {
            message: "Password is too short.",
            criticality: 40
        }
    }

    if(length > 5 && length <= 10) {
        return {
            message: "Password can be longer.",
            criticality: 15
        }
    }
}

function characterTypeCriteria(password, regex, type) {
    const matches = password.match(regex) || [];
    if(matches.length === 0) {
        return {
            message: `No ${type} present`,
            criticality: 20
        }
    }
    if(matches.length <= 2) {
        return {
            message: `Can use more ${type}`,
            criticality: 3
        }
    }
}

function repeatingCharacterCriteria(password) {
    const matches = password.match(/(.)\1/g) || [];
    if(matches.length > 0) {
        return {
            message: "Repeating Characters are present",
            criticality: matches.length * 5
        }
    }
}

function lowerCaseCharsCriteria(password) {
    return characterTypeCriteria(password, /[a-z]/g, "lowercase letters")
}

function upperCaseCharsCriteria(password) {
    return characterTypeCriteria(password, /[A-Z]/g, "uppercase letters")
}

function numericalCharsCriteria(password) {
    return characterTypeCriteria(password, /[0-9]/g, "numerical characters")
}

function specialCharsCriteria(password) {
    return characterTypeCriteria(password, /[^a-zA-Z0-9\s]/g, "special characters")
}