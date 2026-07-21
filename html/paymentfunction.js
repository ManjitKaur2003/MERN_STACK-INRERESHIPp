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






