const type = document.querySelector("#type");
const des = document.querySelector("#des");
const amt = document.querySelector("#amt");
const addbtn = document.querySelector("#add");
const taxbtn = document.querySelector("#tax");
let Chartt, Chartt1, Chartt2;

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
    divAmt.classList.add("flex", "justify-center");
    let tmp = parseInt(amt.value);
    if (type.value == "income") {
        pAmt.classList.add("text-[green]");
        div.classList.add("border-2", "border-lime-400", "bg-[white]", "flex", "justify-between", "px-[2vw]", "m-[1vh]");
        pAmt.innerHTML = "+₹" + amt.value;
    }
    else {
        pAmt.classList.add("text-[red]");
        div.classList.add("border-2", "border-[red]", "bg-[white]", "flex", "justify-between", "px-[2vw]", "m-[1vh]");
        pAmt.innerHTML = "-₹" + amt.value;
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
    document.getElementById("chartCanvas").innerHTML = "";
    document.getElementById("chartCanvas").value = "";
    const ctx = canvas.getContext("2d");

    pieMaker();
    lineMaker();
    barMaker();


    // Data (in percentage)
    const x = (totalInc * 100) / (totalInc + totalExp);
    const y = (totalExp * 100) / (totalInc + totalExp);

    // Colors
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
const barColors = ["#32CD32", "#FF0000"];
function pieMaker() {
    if (Chartt != undefined) {
        // Destroy the existing chart instance
        Chartt.destroy();
    }
    Chartt = new Chart("pie", {

        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                backgroundColor: barColors,
                data: [totalInc, totalExp]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Pie Chart"
            },
            animation: {
                animateRotate: true,
                animateScale: true
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
    });
}

function lineMaker() {
    if (Chartt1 != undefined) {
        // Destroy the existing chart instance
        Chartt1.destroy();
    }
    Chartt1 = new Chart("line", {

        type: "line",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: income,
                borderColor: "#32CD32",
                fill: false
            }, {
                data: expense,
                borderColor: "#FF0000",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: "Line Chart"
            },
            animation: {
                animateRotate: true,
                animateScale: true
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
    });
}
function barMaker() {
    if (Chartt2 != undefined) {
        // Destroy the existing chart instance
        Chartt2.destroy();
    }
    Chartt2 = new Chart("bar", {

        type: "bar",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                backgroundColor: barColors,
                data: [totalInc, totalExp]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Bar Chart"
            },
            animation: {
                animateRotate: true,
                animateScale: true
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
    });
}

const ai = document.getElementById("ai");
        const aipromt = document.getElementById("aiprompt");
        const geminiInput = document.getElementById("geminiInput");
        const geminiButton = document.getElementById("geminiButton");
        const middleContainer = document.getElementById("middleContainer");
        const aiContainer = document.getElementById("aiContainer");

        import { GoogleGenerativeAI } from "@google/generative-ai";

        import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


        // Fetch your API_KEY
        const API_KEY = "AIzaSyDO1vxwfZ0JZE3S_d0BYEm3mUT-fe_vJ40";

        // Access your API key (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(API_KEY);

        // ...




        async function run(prompt) {
            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },


            ];

            const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello, I have 2 dogs in my house." }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Great to meet you. What would you like to know?" }],
                    },

                ],
                generationConfig: {
                    maxOutputTokens: 100,
                },
            });

            geminiButton.addEventListener("click", async () => {
                let prompt = geminiInput.value;
                const result = await chat.sendMessage(prompt);
                const response = await result.response;
                const text_ = response.text();
                console.log(text_);
                middleContainer.innerHTML = "";
                let plainText = text_
                    .replace(/\*\*(.*?)\*\*/g, "$1")
                    .replace(/\*(.*?)\*/g, "$1");
                middleContainer.innerHTML = `<pre>${plainText}</pre>`;


            });
        }
        run();

        // run("hello");



        // {
        //         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_DANGEROUS,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_DEROGATORY,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_TOXICITY,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_VIOLENCE,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_SEXUAL,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     },
        //     {
        //         category: HarmCategory.HARM_CATEGORY_MEDICAL,
        //         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        //     }



