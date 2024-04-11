const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
//next part
const btn = document.querySelector("form button");
//next
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
//next 
const msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
})//add here..first time website load hote hi update ho jayega

// for (code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){ //for 4 option
for (currCode in countryList){    // for all countries
    let newOption = document.createElement("option"); //new empty option
    newOption.innerText = currCode;   //add text or change text
    newOption.value = currCode;       // here x=currcode, x:y
    if(select.name === "from" && currCode === "USD"){
        newOption.selected= "selected"; //both conditions true so USD Selected as default
    }else if (select.name === "to" && currCode === "INR"){
        newOption.selected= "selected";
    }
    select.append(newOption);
}

select.addEventListener("change", (evt) => { //it is called when we change option to update flag
    updateFlag(evt.target); //where change occured
});
}

//change the flag
const updateFlag = (element)=> {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //url comment change 
    updateExchangeRate(); //last step
});

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input"); //just selects the element
    let amtVal = amount.value; //selects the value
    // console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    } //math part of updaated 1usd = 80inr

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;  //1 usd = 80 inr (to change it)
}








