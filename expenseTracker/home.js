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
const logout=document.querySelector("#outer");
const tax=document.querySelector("#taxer");

var userData = JSON.parse(localStorage.getItem("currUser"));
var Name = userData.fName;
console.log(Name);

let income = [];
let expense = [];
let totalInc = 0;
let totalExp = 0;
let total = 0;

addbtn.addEventListener("click", () => {
    document.querySelector("#cha").style.display="block";
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
    div.classList.add("rounded-md","animate__animated","animate__fadeInUp")
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

// function propLine() {
//     const canvas = document.getElementById("chartCanvas");
//     document.getElementById("chartCanvas").innerHTML = "";
//     document.getElementById("chartCanvas").value = "";
//     const ctx = canvas.getContext("2d");

//     pieMaker();
//     lineMaker();
//     barMaker();


//     // Data (in percentage)
//     const x = (totalInc * 100) / (totalInc + totalExp);
//     const y = (totalExp * 100) / (totalInc + totalExp);

//     // Colors
//     const redColor = "#FF0000";

//     // Calculate bar lengths
//     const totalWidth = canvas.width;
//     const xBarWidth = (x / 100) * totalWidth;
//     const yBarWidth = (y / 100) * totalWidth;

//     // Draw bars
//     ctx.fillStyle = "#32CD32";
//     ctx.fillRect(0, 0, xBarWidth, canvas.height);

//     ctx.fillStyle = redColor;
//     ctx.fillRect(xBarWidth, 0, yBarWidth, canvas.height);
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

function propLine() {
    const canvas = document.getElementById("chartCanvas");
    document.getElementById("chartCanvas").innerHTML = "";
    document.getElementById("chartCanvas").value = "";
    const ctx = canvas.getContext("2d");

    const x = (totalInc * 100) / (totalInc + totalExp);
    const y = (totalExp * 100) / (totalInc + totalExp);

    const redColor = "#FF0000";

    const totalWidth = canvas.width;
    const xBarWidth = (x / 100) * totalWidth;
    const yBarWidth = (y / 100) * totalWidth;
    let currentX = 0;
    let currentY = 0;
    const animationSpeed = 33; 

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#32CD32";
        ctx.fillRect(0, 0, currentX, canvas.height);

        ctx.fillStyle = redColor;
        ctx.fillRect(currentX, 0, currentY, canvas.height);

        if (currentX < xBarWidth || currentY < yBarWidth) {
            currentX += (xBarWidth - currentX) / animationSpeed;
            currentY += (yBarWidth - currentY) / animationSpeed;
            requestAnimationFrame(draw);
        }
    }
    pieMaker();
    lineMaker();
    barMaker();
    draw();
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
    let labl;
    let labldata;
    let lablcol;
    if (Chartt2 != undefined) {
        // Chartt2.destroy();
        addDataBar()
        return;
    }
    if(income.length==0 && expense.length==0){
        return;
    }
    if(type.value=="income"){
        labl="Income";
        labldata=income[0];
        lablcol=barColors[0];
    }
    else{
        labl="Expense";
        labldata=expense[0];
        lablcol=barColors[1];
    }
    Chartt2 = new Chart("bar", {

        type: "bar",
        data: {
            labels: [labl],
            datasets: [{
                backgroundColor:[lablcol],
                data: [labldata]
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
function addDataBar() {
    if(type.value=="income"){
    Chartt2.data.labels.push("Income" );
    Chartt2.data.datasets[0].backgroundColor.push("#32CD32");
    Chartt2.data.datasets[0].data.push(income[income.length-1]);
    }
    else{
    Chartt2.data.labels.push("Expense" );
    Chartt2.data.datasets[0].backgroundColor.push("#FF0000");
    Chartt2.data.datasets[0].data.push(expense[expense.length-1]);
    }
    Chartt2.update();
}

const askAi=document.querySelector("#AskAi");

const AiKotoba = document.querySelector("#AiChat");
const UserInp = document.querySelector("#AiInput");
const send = document.querySelector("#send");
const advice = document.querySelector("#advice");
const exit=document.querySelector("#close");


import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
let conversationHistory = [ {
    role: "user",
    parts: [{ text: "Introduce yourself as Waifu-chan who can help with your expense tracking. Also act like a cute waifu and try to be funny.Also try to use ara ara in your sentence whenever it is applicable. Also call me "+Name+"-san" }],
},
{
    role: "model",
    parts: [{ text: "Ara ara, "+Name+" My name is Waifu-chan, and I'm here to help you with your expense tracking! You know, it's important to keep track of your money. That way, you won't end up spending it all on dango and end up broke! I can help you categorize your expenses, create budgets, and even generate reports. I'm also super easy to use! Just tell me what you need, and I'll take care of the rest. So, what are you waiting for? Let's get started on tracking your expenses together! I promise to make it fun!" }],
},];
AiKotoba.innerHTML="Ara ara, "+Name+"-san! My name is Waifu-chan, and I'm here to help you with your expense tracking! You know, it's important to keep track of your money. That way, you won't end up spending it all on dango and end up broke! I can help you categorize your expenses, create budgets, and even generate reports. I'm also super easy to use! Just tell me what you need, and I'll take care of the rest. So, what are you waiting for? Let's get started on tracking your expenses together! I promise to make it fun!";

const genAI = new GoogleGenerativeAI("AIzaSyDO1vxwfZ0JZE3S_d0BYEm3mUT-fe_vJ40");
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
    // const chat = model.startChat({
        // history: [
            // {
            //     role: "user",
            //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
            // },
            // {
            //     role: "model",
            //     parts: [{ text:"" }],
            // },

        // ],
    //     generationConfig: {
    //         maxOutputTokens: 100,
    //     },
    // });

    send.addEventListener("click", async () => {
        if (UserInp.value.length < 4) {
            AiKotoba.innerHTML = "Try again";
            return;
        }
        document.getElementById("Ai").src="../images/home.gif";
        AiKotoba.innerHTML = "Thinking...";
        let userMessage = UserInp.value;
        try{
        const chat = model.startChat({
            history: conversationHistory,
            generationConfig: {
                maxOutputTokens: 250,
            },
        });
        
        const result = await chat.sendMessage(userMessage);
        console.log("here");
        console.log(result);
        const response = await result.response;
        console.log("here2");
        console.log(response);
        const text_ = response.text();
        console.log("here3");
        console.log(text_);
        console.log(text_);
        AiKotoba.innerHTML = "";
        
        AiKotoba.innerHTML =text_;
        conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
        UserInp.value = "";
        conversationHistory.push({ role: "model", parts: [{ text: text_ }] });
        document.getElementById("Ai").src="../images/chat.gif";
    }
    catch(error){
        AiKotoba.innerHTML ="Sorry please reload the website"
    }

    });
    advice.addEventListener("click", async () => {
        AiKotoba.innerHTML = "Thinking...";
        document.getElementById("Ai").src="../images/home.gif";
        let userMessage =`My total income ₹${totalInc} and my expenses are ₹${totalExp} please give me advice for money management`;
        try{
        const chat = model.startChat({
            history: conversationHistory,
            generationConfig: {
                maxOutputTokens: 400,
            },
        });
        
        const result = await chat.sendMessage(userMessage);
        console.log("here");
        console.log(result);
        const response = await result.response;
        console.log("here2");
        console.log(response);
        const text_ = response.text();
        console.log("here3");
        console.log(text_);
        console.log(text_);
        AiKotoba.innerHTML = "";
        
        AiKotoba.innerHTML =text_;
        conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
        UserInp.value = "";
        conversationHistory.push({ role: "model", parts: [{ text: text_ }] });
        document.getElementById("Ai").src="../images/chat.gif";
    }
    catch(error){
        AiKotoba.innerHTML ="Sorry please reload the website"
    }

    });
    

}
run();

exit.addEventListener("click",()=>{
    document.querySelector(".pop").style.display = "none";
})
document.querySelector("#close2").addEventListener("click",()=>{
    document.querySelector(".pop2").style.display = "none";
})
askAi.addEventListener("click",()=>{
    document.querySelector(".pop").style.display = "block";
})
logout.addEventListener("click",()=>{
    localStorage.removeItem("currUser");
    window.location.href = "../index.html";
})
tax.addEventListener("click",()=>{
    let taxRate;
    if (totalInc+totalExp >= 1500000) {
        taxRate = 0.3;
    } else if (totalInc+totalExp >= 1200000) {
        taxRate = 0.20;
    } else if (totalInc+totalExp >= 600000) {
        taxRate = 0.1;
    }else if (totalInc+totalExp >= 500000) {
        taxRate = 0.05;
    }else if (totalInc+totalExp >= 300000) {
        taxRate = 0.05;
    }
     else {
        taxRate = 0;
    }

    let taxesDue = (totalInc+totalExp) * taxRate;
    document.querySelector(".pop2").style.display = "block";
    document.querySelector("#AiChat2").innerHTML=  `With great rupees comes great responsibility... to pay taxes! Don't worry, Waifu-chan will explain everything in a way that even a sleepy kitten could understand<br> 
    Here's the lowdown on those pesky taxes: <br>
    •	Less than ₹3 lakh? Lucky you! No taxes for you!  Go treat yourself to some mochi!,<br>
    •	₹3 lakh to ₹5 lakh? Only a tiny 5% goes to the taxman! That's like sharing one bite of your favorite dango!<br>
    •	₹5 lakh to ₹6 lakh? Still just a little 5% nibble! You're a master of money management!<br> 
    •	₹6 lakh to ₹9 lakh? Okay, now it's getting a bit more serious... 10%! But you're still a high roller!<br> 
    •	₹9 lakh to ₹12 lakh? 15% tax time! But think of all the good you're doing for India!<br> 
    •	₹12 lakh to ₹15 lakh? 20% now, but your bank account is still looking healthy!<br> 
    •	Above ₹15 lakh? Woah! You're a super-rich Goshujin-sama! 30% goes to taxes, but you're still on top of the world!<br><br>
    For your total amount of ₹${totalInc}, the total due tax is ₹${taxesDue}
    `
})


