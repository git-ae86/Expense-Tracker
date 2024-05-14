const type = document.querySelector("#type");
const des = document.querySelector("#des");
const amt = document.querySelector("#amt");
const addbtn = document.querySelector("#add");
const taxbtn = document.querySelector("#tax");

const bal = document.querySelector("#bal");
const inc = document.querySelector("#inc");
const exp = document.querySelector("#exp");
const trans = document.querySelector("#trans");

const hist = document.querySelector(".history")

let income = [];
let expense = [];
let totalInc = 0;
let totalExp = 0;
let total = 0;

addbtn.addEventListener("click", () => {

    if (des.value == "") {
        alert("Add Some Description");
        return;
    }

    if (amt.value == "") {
        alert("Please enter an amount");
        return;
    }

    if (type.value == "income") {
        income.push(parseInt(amt.value));
    }
    else {
        expense.push(parseInt(amt.value));
    }

    trans.innerHTML = `You had ${income.length} incomes and ${expense.length} expenses `;
    totalInc = 0;
    income.forEach(ele => {
        totalInc += ele;
    });
    totalExp = 0;
    expense.forEach(ele => {
        totalExp += ele;
    })
    inc.innerHTML = "₹" + totalInc;
    exp.innerHTML = "₹" + totalExp;
    bal.innerHTML = `₹${totalInc - totalExp}`;
    propLine();

    const div = document.createElement("div");
    const pType = document.createElement("p");
    pType.innerHTML = type.value;
    const pDes = document.createElement("p");
    pDes.innerHTML = des.value;
    const pAmt = document.createElement("p");
    const divAmt = document.createElement("div");
    divAmt.append(pAmt);
    divAmt.classList.add("flex" ,"justify-center");
    let tmp=parseInt(amt.value);
    if (type.value == "income") {
        pAmt.classList.add("text-[green]");
        div.classList.add("border-2", "border-lime-400", "bg-[white]", "flex", "justify-between", "px-[2vw]", "m-[1vh]");
        pAmt.innerHTML = "+₹"+amt.value;
    }
    else {
        pAmt.classList.add("text-[red]");
        div.classList.add("border-2", "border-[red]", "bg-[white]", "flex", "justify-between", "px-[2vw]", "m-[1vh]");
        pAmt.innerHTML = "-₹"+amt.value;
    }
    const cro = document.createElement("p");
    cro.innerHTML = "&times";
    cro.classList.add("cross")
    div.append(pType, pDes, divAmt, cro);
    hist.append(div);

    cro.addEventListener("click", () => {
        if (type.value == "income") {
            for (let i = 0; i < income.length; i++) {
                if (income[i] == parseInt(tmp)) {
                    // console.log(income[i] + " " + tmp);
                    income.splice(i, 1);

                    trans.innerHTML = `You had ${income.length} incomes and ${expense.length} expenses `;
                    totalInc = 0;
                    income.forEach(ele => {
                        totalInc += ele;
                    });
                    totalExp = 0;
                    expense.forEach(ele => {
                        totalExp += ele;
                    })
                    inc.innerHTML = "₹" + totalInc;
                    exp.innerHTML = "₹" + totalExp;
                    bal.innerHTML = `₹${totalInc - totalExp}`;
                    propLine();

                    div.remove();
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < income.length; i++) {
                if (expense[i] == parseInt(tmp)) {
                    console.log()
                    expense.splice(i, 1);

                    trans.innerHTML = `You had ${income.length} incomes and ${expense.length} expenses `;
                    totalInc = 0;
                    income.forEach(ele => {
                        totalInc += ele;
                    });
                    totalExp = 0;
                    expense.forEach(ele => {
                        totalExp += ele;
                    })
                    inc.innerHTML = "₹" + totalInc;
                    exp.innerHTML = "₹" + totalExp;
                    bal.innerHTML = `₹${totalInc - totalExp}`;
                    propLine();

                    div.remove();
                    break;
                }
            }
        }
    })

})


document.addEventListener("DOMContentLoaded", propLine)

function propLine() {
    const canvas = document.getElementById("chartCanvas");
    document.getElementById("chartCanvas").innerHTML="";
    document.getElementById("chartCanvas").value="";
    const ctx = canvas.getContext("2d");
    

    // Data (in percentage)
    const x = (totalInc*100)/(totalInc+totalExp);
    const y =(totalExp*100)/(totalInc+totalExp);

    // Colors
    const greenColor = "#00FF00";
    const redColor = "#FF0000";

    // Calculate bar lengths
    const totalWidth = canvas.width;
    const xBarWidth = (x / 100) * totalWidth;
    const yBarWidth = (y / 100) * totalWidth;

    // Draw bars
    ctx.fillStyle = "#32CD32";
    ctx.fillRect(0, 0, xBarWidth, canvas.height);

    ctx.fillStyle = redColor;
    ctx.fillRect(xBarWidth, 0, yBarWidth, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
}


