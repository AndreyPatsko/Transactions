// function wich find operation and make transaction in date
function makeTransaction(day,month,year,name){
    var dateOfTransaction = String(day + "-" +month+"-"+year);
    var currency;
    if ((year >= 2016)&&(month >= 7)){
        currency = "Byn";
    }
    else {
        currency = "Byr";
    }
    var operationx = db.operations.find({"name": name,"currency":currency}).toArray();
    var ammount = Math.round(randomMinMax(operationx[0].ammountMin,operationx[0].ammountMax))
    db.transactions.insertOne({
                            "date":dateOfTransaction,
                            "name":operationx[0].name,
                            "type":operationx[0].type,
                            "ammount":ammount,
                            "currency":currency,
                            "account":operationx[0].account
                                })
}