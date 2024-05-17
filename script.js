let primeiroNumero = ''
let segundoNumero = ''
let operacaoAtual = null
let resetarTela = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('btnIgual')
const clearButton = document.getElementById('btnClear')
const deleteButton = document.getElementById('btnDelete')
const pointButton = document.getElementById('btnPonto')
const telaOperacaoAtual = document.getElementById('telaOperacaoAtual')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (telaOperacaoAtual.textContent === '0' || resetarTela)
    resetScreen()
  telaOperacaoAtual.textContent += number
}

function resetScreen() {
    telaOperacaoAtual.textContent = ''
    resetarTela = false
}

function clear() {
    telaOperacaoAtual.textContent = '0'
    primeiroNumero = ''
    segundoNumero = ''
    operacaoAtual = null
}

function appendPoint() {
  if (resetarTela) resetScreen()
  if (telaOperacaoAtual.textContent === '')
    telaOperacaoAtual.textContent = '0'
  if (telaOperacaoAtual.textContent.includes('.')) return
  telaOperacaoAtual.textContent += '.'
}

function deleteNumber() {
    telaOperacaoAtual.textContent = telaOperacaoAtual.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (operacaoAtual !== null) evaluate()
    primeiroNumero = telaOperacaoAtual.textContent
    operacaoAtual = operator
    resetarTela = true
}

function evaluate() {
  if (operacaoAtual === null || resetarTela) return
  if (operacaoAtual === '/' && telaOperacaoAtual.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  segundoNumero = telaOperacaoAtual.textContent
  telaOperacaoAtual.textContent = roundResult(
    operate(operacaoAtual, primeiroNumero, segundoNumero)
  )
  operacaoAtual = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '/'
  if (keyboardOperator === '*') return '*'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}