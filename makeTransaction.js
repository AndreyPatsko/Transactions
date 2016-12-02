// function wich find operation and make transaction in date
function makeTransaction(day,month,year,name){
    // var dateOfTransaction = String(day + "-" +month+"-"+year);
    var dateOfTransaction = new Date(year,month-1,day);
    var currency;
    if ((year >= 2016)&&(month >= 7)){
        currency = "Byn";
    }
    else {
        currency = "Byr";
    }
    if((name == "House Rent")||(name == "Parents")){
        currency = "Usd";
    }
    var operationx = db.operations.find({"name": name,"currency":currency}).toArray();
    var ammount = Math.round(randomMinMax(operationx[0].ammountMin,operationx[0].ammountMax))
    var randomTransactionName = Math.round((0 + Math.random()*((operationx[0]["transaction name"].length -1)- 0)))
    db.transactions.insertOne({
                            "date":dateOfTransaction,
                            "nameCategory":operationx[0].name,
                            "nameTransaction":operationx[0]["transaction name"][randomTransactionName],
                            "type":operationx[0].type,
                            "ammount":ammount,
                            "currency":currency,
                            "account":operationx[0].account
                                })
}