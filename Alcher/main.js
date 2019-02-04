const runePriceEl = document.querySelector("#runePrice")
const itemPriceEl = document.querySelector("#itemPrice")
const itemAmountEl = document.querySelector("#itemAmount")
const alchValEl = document.querySelector("#alchVal")

const resultEl = document.querySelector('#result')

const profitEl = document.querySelector('#profit')
const xpResultEl = document.querySelector('#xpResult')
const initialBuyEl = document.querySelector('#initialBuy')
const initialRuneBuyEl = document.querySelector('#initialBuy2')

const hiAlchXp = 65

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

	const totalXP = hiAlchXp * itemAmount

	if (profit > 0) {
		setGreen()

		profitEl.innerHTML = `You'll be making a profit of ${profit}GP.`

	} else {
		setRed()

		profitEl.innerHTML = `You'll be making a loss of ${profit}GP.`
	}

	xpResultEl.innerHTML = `You'll receive ${totalXP} XP.`
	initialBuyEl.innerHTML = `Initial Buy (Without Runes): ${itemAmount * itemPrice}GP.`
	initialRuneBuyEl.innerHTML = `Initial Buy (With Runes): ${itemAmount * (runePrice + itemPrice)}`
}

runePriceEl.addEventListener('keydown', calculateProfit)
itemPriceEl.addEventListener('keydown', calculateProfit)
itemAmountEl.addEventListener('keydown', calculateProfit)
alchValEl.addEventListener('keydown', calculateProfit)

runePriceEl.addEventListener('keyup', calculateProfit)
itemPriceEl.addEventListener('keyup', calculateProfit)
itemAmountEl.addEventListener('keyup', calculateProfit)
alchValEl.addEventListener('keyup', calculateProfit)