//function generate random days in year and make transactions
function randomYear(begin,end,array){
    var finalArray = [];
    var rate = array.rate;

    for(var i = begin.getFullYear(),k=0; i <=end.getFullYear(); i++,k++){
        finalArray[k] = {};
        monthArray = [];
        for(var j = 0; j<rate; j++){
            
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            finalArray[k][month] = day;
        }
    }
    for(var q = 0; q<= finalArray.length;q++){

        var ammount = Math.round(randomMinMax(array.ammountMin,array.ammountMax))
        var randomTransactionName = Math.round((0 + Math.random()*((array["transaction name"].length -1)- 0)))
        var dateOfTransaction = new Date() //ну тут как-то дату вставить..
             db.transactions.insertOne({
                            "date":dateOfTransaction,
                            "nameCategory":array.name,
                            "nameTransaction":array["transaction name"][randomTransactionName],
                            "type":array.type,
                            "ammount":ammount,
                            "currency":currency,
                            "account":array.account
                                })
    }                            
}
