
'use strict';

	/*----------- Problem 31 ---------*/
	function initialSum(currency) {
		return Math.floor(currency / 2) + 1;
	}

	var partialSumMemoized = _.memoize(partialSum, function (partial, currency) {
		return partial.value + ',' + currency;
	});

	function partialSum(pence, currency) {
		var ways = new BigNumber(0);
		var times = Math.floor(currency / pence.value);
		while (times >= 0) {
			var rest = currency - (times * pence.value);
			ways = ways.plus(pence.operation(rest));
			times--;
		}
		return ways.toNumber();
	}

	function coinSums (amount) {
		if (amount == 0) {
			return 0;
		}
		return [5, 10, 20, 50, 100, 200].reduce(function (partial, current) {
			return function (someAmount) {
				return partialSumMemoized({
					value: current,
					operation: partial
				}, someAmount);
			};
		}, initialSum)(amount);
	};


	/*--------- Problem 25 ---------*/
	function numDigits(x) {
		return x.toString().length;
	}

	function countFibonacci(n) {
		if (n < 2) {
			return Math.max(n, 0)
		}
		BigNumber.config({EXPONENTIAL_AT: 1001})
		var prev = new BigNumber(1);
		var current = new BigNumber(1);
		var result = new BigNumber(0);
		var bigNumResult = new BigNumber(2);

		while (numDigits(result) < n) {
			result = current.plus(prev);
			prev = current;
			current = result;

			bigNumResult = bigNumResult.plus(1);
		}
		return bigNumResult.toString();
	}


	/*--------- Problem 191 ---------*/
	var PartialPrizeMemoized = _.memoize(PartialPrize);
	function PartialPrize(n) {
		if (n < -1) return 0;
		if (n == -1) return 1;

		return PartialPrizeMemoized(n - 1) +
			PartialPrizeMemoized(n - 2) +
			PartialPrizeMemoized(n - 3);
	}
	function prizeForDays(n) {
		var prizedDays = PartialPrizeMemoized(n);
		for (var i = 1; i <= n; i++) {
			prizedDays += PartialPrizeMemoized(i - 1) * PartialPrizeMemoized(n - i);
		}

		return prizedDays;
	}






	/*
	* TODO: Optimize
	* Below is a quick simulation of a ui layer for validation or management of inputs
	* The functions will get a string and convert to a number
	* Will be better implementation with angular and having a two way binding
	*
	* */
	function isValidInput(inputToValid) {
		if (inputToValid && inputToValid != '') {
			return true;
		} else {
			return false;
		}
	}
	function uiCoinSums() {
		var inputCurrency = document.getElementById('inputCoins').value;
		if (isValidInput(inputCurrency)) {
			var argCoinSum = parseInt(inputCurrency);
			var resultCurrency = coinSums(argCoinSum);
			var domObjCurrency = document.getElementById('resultCurrency');
			domObjCurrency.innerHTML = resultCurrency;
		}

	}
	function uiCountFibonacci() {
		var inputDigits = document.getElementById('inputDigits').value;
		var argFibonacci = parseInt(inputDigits);
		var resultFibonacci = countFibonacci(argFibonacci);
		var domObjFibonacci = document.getElementById('resultFibonacci');
		domObjFibonacci.innerHTML = resultFibonacci;
	}
	function uiResultPrize() {
		var inputDays = document.getElementById('inputDays').value;
		var argPrize = parseInt(inputDays);
		var resultPrize = prizeForDays(argPrize);
		var domObjPrize = document.getElementById('resultPrize');
		domObjPrize.innerHTML = resultPrize;
	}



(function() {

	/*Get the results*/
	var resultCurrency = coinSums(200);
	var resultFibonacci = countFibonacci(1000);
	var resultPrize = prizeForDays(30);
	/*Get dom objects*/
	var domObjCurrency = document.getElementById('resultCurrency');
	var domObjFibonacci = document.getElementById('resultFibonacci');
	var domObjPrize = document.getElementById('resultPrize');
	/*set the results*/
	domObjCurrency.innerHTML = resultCurrency;
	domObjFibonacci.innerHTML = resultFibonacci;
	domObjPrize.innerHTML = resultPrize;

})();
