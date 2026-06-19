
function calcExpVal(bO1, bOx, bO2) {
    const A = [
        [bO1 - 1, -1, -1, -1],
        [-1, bOx - 1, -1, -1],
        [-1, -1, bO2 - 1, -1],
        [1, 1, 1, 0]
    ]

    const b = [0, 0, 0, 1] 

    // const solution = math.lusolve(A, b);

    return math.lusolve(A, b);
}

const betting_odd_1 = document.getElementById("betting_odd_1");
const betting_odd_X = document.getElementById("betting_odd_X");
const betting_odd_2 = document.getElementById("betting_odd_2");

const eins = document.getElementById("1");
const X = document.getElementById("X");
const zwei = document.getElementById("2");
const ExpValue = document.getElementById("ExpValue");

console.log(eins, X, zwei, ExpValue)

function change () {
    const result = calcExpVal(
        Number(betting_odd_1.value),
        Number(betting_odd_X.value),
        Number(betting_odd_2.value)
    );

    eins.innerHTML = (result[0][0] * 100).toFixed(2) + "%";
    X.innerHTML = (result[1][0] * 100).toFixed(2) + "%";
    zwei.innerHTML = (result[2][0] * 100).toFixed(2) + "%";

    ExpValue.innerHTML = "On average you " + ((result[3][0] > 0) ? "win " : "lose ") + Math.abs(result[3][0] * 100).toFixed(2)  + "% of your bet amount on every bet.";
}

change();