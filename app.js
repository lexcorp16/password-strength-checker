const input = document.getElementById('input');
const button = document.getElementById('submit');
const strengthMeter = document.getElementById('strength-meter');
const strengthLevel = document.getElementById('strength-level');
const output = document.getElementById('output');
const error = document.getElementById('error');

const colors = {
  green: '#2BC253',
  yellow: '#FFC30B',
  red: '#ED2939',
  // blue: '#0F52BA',
};

const colorsToPasswordStrength = {
  25: colors.red,
  50: colors.yellow,
  75: colors.green,
  100: colors.green,
};

const passwordStrengthCriteria = [
  { pattern: /\d/, value: 25 },
  { pattern: /[a-z]/, value: 25 },
  { pattern: /[A-Z]/, value: 25 },
  { pattern: /[@!$&#]/, value: 25 },
];

const getPasswordStrength = password => {
  let total = 0;
  passwordStrengthCriteria.map(criteria => {
    if (password.match(criteria.pattern)) {
      total += criteria.value;
    }
  });

  return total;
};

button.onclick = () => {
  const password = input.value;

  if (password.length > 12 || password.length < 6) {
    error.innerHTML =
      password.length < 6
        ? 'Password must be at least 6 characters'
        : 'Password must not be more than 12 characters';
    strengthMeter.style.display = 'none';
  } else {
    const passwordStrength = getPasswordStrength(password);
    output.innerHTML = `Your password strength is ${passwordStrength}%`;
    strengthLevel.setAttribute(
      'style',
      `width: ${passwordStrength}%; background-color: ${
        colorsToPasswordStrength[passwordStrength]
      }`,
    );
  }
};

input.onkeydown = () => {
  output.innerHTML = '';
  error.innerHTML = '';
  strengthMeter.setAttribute('style', 'display: initial;');
  strengthLevel.setAttribute('style', 'width: 0;');
};
