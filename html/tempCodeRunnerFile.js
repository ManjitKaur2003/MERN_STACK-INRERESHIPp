// sort
const numbers1 = [1,2,3,4,5];
numbers1.sort((a,b) => b-a);
console.log(numbers1);

// reduce
const cart = [500,1500,2500];
const totalAmount = cart.reduce((total,price) => total + price, 0);
console.log(totalAmount);

// map
let usersName = [
    {name: "Jagjit Singh", age: 25},
    {name: "Manjit Kaur", age: 23},
    {name: "Komalpreet Kaur Saini", age: 23}
];
let userNames = users.map(user => user.name);
console.log(userNames);


// filter
const numbers3 = [1,2,3,4];
const evens = numbers3.filter(num => num % 2 === 0);
console.log(evens);

// payment functions
function checkplan(plan){
    if(plan === "daily")
        {
        return 150;
    }
    else if(plan === "weekly")
        {
        return 70;
    }
    else if(plan === "monthly")
        {
        return 300;
    }
    else
        {
        return 0;
    }
}

function applydiscount(amount)
{
    return amount * 0.1;
}

function generatebill(plan, validity)
{
    let amount = checkplan(plan);

    if(amount === 0)
        {
        console.log("Invalid plan recharge");
        return;
    }

    let discount = applydiscount(amount);
    let finalamount = amount - discount;

    console.log("Plan:", plan);
    console.log("Validity:", validity);
    console.log("Amount:", amount);
    console.log("Discount:", discount);
    console.log("Final Amount:", finalamount);
}

// Function call
generatebill("monthly", 30);






