
export function odds(arr) {
    let oddsArr = [];
    arr.forEach(number => {
        if (number % 2 === 0) {
            oddsArr = [...oddsArr, number] // Es lo mismo que oddsArr.push(number);
        }
    })
    return oddsArr;
}

