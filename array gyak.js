function getOtosLotteryNumbers() {
    const fiveLotteryNumbers = new Set();
    let randomNumber;
    do {
        randomNumber = Math.round(Math.random() * 100);
        if (randomNumber > 0 && randomNumber <= 90) {
            fiveLotteryNumbers.add(randomNumber);
        }

    }
    while (fiveLotteryNumbers.size != 5);
    return [...fiveLotteryNumbers];
}

function getSortedtLotteryNumbers(numbers) {
    return numbers.sort(function (a, b) { return a - b });
}

function getNumberOfHits(tips, lottoNumbers) {
    let numberOfMatches = 0;
    for (let i = 0; i < 5; i++) {
        if (lottoNumbers.includes(tips[i])) {
            numberOfMatches++;
        }
    }
    return numberOfMatches;
}

function getMonthlyLotteryArrayNumbers() {
    const monthlyLotteryNumbers = [];
    for (let i = 0; i < 4; i++) {
        monthlyLotteryNumbers.push(getOtosLotteryNumbers());
    }
    return monthlyLotteryNumbers;
}
function getMonthlyLotteryArrayUniqueNumbers(monthlyLotteryNumbers) {
    const uniqueNumbers = new Set();
    monthlyLotteryNumbers.forEach(weeklyNumbers => {
        weeklyNumbers.forEach(number => {
            uniqueNumbers.add(number);
        });
    });
    return [...uniqueNumbers];
}
function monthlyStatistics(uniqueNumbers, monthlyNumbers) {
    let numberOfMatches = 0;
    const numbersAndTheirCount = [];
    uniqueNumbers.forEach(uniqueNumber => {
        monthlyNumbers.forEach(weeklyNumbers => {
            numberOfMatches += weeklyNumbers.filter(x => x == uniqueNumber).length;
        });
        numbersAndTheirCount.push([uniqueNumber, numberOfMatches]);
        numberOfMatches = 0;
    });
    return numbersAndTheirCount;
}
let fiveLottoNumbers = getOtosLotteryNumbers();
let tips = getOtosLotteryNumbers();
let monthlyLotteryNumbers = getMonthlyLotteryArrayNumbers();
let uniquNumbers = getMonthlyLotteryArrayUniqueNumbers(monthlyLotteryNumbers);
let numbersAndTheirCount = monthlyStatistics(uniquNumbers, monthlyLotteryNumbers);
console.log(fiveLottoNumbers);
fiveLottoNumbers = getSortedtLotteryNumbers(fiveLottoNumbers);
console.log(fiveLottoNumbers);
console.log(tips);
console.log(getNumberOfHits(tips, fiveLottoNumbers));
console.log(monthlyLotteryNumbers);
console.log(uniquNumbers);
console.log(numbersAndTheirCount);