const runePriceEl = document.querySelector("#runePrice")
const itemPriceEl = document.querySelector("#itemPrice")
const itemAmountEl = document.querySelector("#itemAmount")
const alchValEl = document.querySelector("#alchVal")

const resultEl = document.querySelector('#result')

function addClass (el, className) {
	if (el.classList) {
		el.classList.add(className)
	} else {
		el.className += ' ' + className
	}
}

function removeClass (el, className) {
	if (el.classList) {
		el.classList.remove(className)
	} else {
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
	}
}

function setRed () {
	removeClass(resultEl, 'asbestos-flat')
	removeClass(resultEl, 'emerald-flat')
	addClass(resultEl, 'alizarin-flat')
}

function setGreen () {
	removeClass(resultEl, 'asbestos-flat')
	removeClass(resultEl, 'alizarin-flat')
	addClass(resultEl, 'emerald-flat')
}

function calculateProfit () {
	const runePrice = parseInt(runePriceEl.value, 10)
	const itemPrice = parseInt(itemPriceEl.value, 10)
	const itemAmount = parseInt(itemAmountEl.value, 10)
	const alchVal = parseInt(alchValEl.value, 10)

	const singleProfit = alchVal - (runePrice + itemPrice)

	const profit = itemAmount * singleProfit

	if (profit > 0) {
		setGreen()

		resultEl.innerHTML = `You'll be making a profit of ${profit}GP.`

	} else {
		setRed()

		resultEl.innerHTML = `You'll be making a loss of ${profit}GP.`
	}
}

runePriceEl.addEventListener('keydown', calculateProfit)
itemPriceEl.addEventListener('keydown', calculateProfit)
itemAmountEl.addEventListener('keydown', calculateProfit)
alchValEl.addEventListener('keydown', calculateProfit)

runePriceEl.addEventListener('keyup', calculateProfit)
itemPriceEl.addEventListener('keyup', calculateProfit)
itemAmountEl.addEventListener('keyup', calculateProfit)
alchValEl.addEventListener('keyup', calculateProfit)