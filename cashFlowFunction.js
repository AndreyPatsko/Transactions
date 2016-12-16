function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}
//function get array of dates from rates collection
function getArrayOfDates(){
    var dateArrayNew=[];
    var dateArray = db.rates.find({},{_id:0,"Date":1}).toArray();
    for (var t = 0; t < dateArray.length; t++){
        dateArrayNew[t]=new Date(Date.parse(dateArray[t].Date))
        dateArrayNew[t];// need thmsing do with dates
    }
    return dateArrayNew;
}

//function create cashflow for every day from collection of transactions
function create(){
    //thre accounts for counting
    var Byr = 0;
    var Byn = 0;
    var Usd = 0;
    //getting array of dates from the collection rates and get beginDate and endDate   
    var dateArray = getArrayOfDates().sort(compareNumeric);
    db.cashFlow.remove({});
    for(var i = 0; i < dateArray.length; i++){
        var transactionsOfDateArray = db.getCollection('transactions').find({Date:dateArray[i]}).toArray();
        for(var j = 0; j < transactionsOfDateArray.length; j++){
            if(transactionsOfDateArray[j]["Type"] == "Exp"){
                switch(transactionsOfDateArray[j]["Currency"]){
                    case "Byr":
                    Byr -= transactionsOfDateArray[j]["Amount"];
                    break;
                    case "Byn":
                    Byn -= transactionsOfDateArray[j]["Amount"];
                    break;
                    case "Usd":
                    Usd -= transactionsOfDateArray[j]["Amount"];
                    break;
                }
            }else if(transactionsOfDateArray[j]["Type"] == "Inc"){
                switch(transactionsOfDateArray[j]["Currency"]){
                    case "Byr":
                    Byr += transactionsOfDateArray[j]["Amount"];
                    break;
                    case "Byn":
                    Byn += transactionsOfDateArray[j]["Amount"];
                    break;
                    case "Usd":
                    Usd += transactionsOfDateArray[j]["Amount"];
                    break;
                }
            }
        }
        db.cashFlow.insertOne({
                "Date":dateArray[i],
                "Byr":Byr,
                "Byn":Byn,
                "Usd":Usd
        })
    }
}
create();