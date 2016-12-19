function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}
//function get array of dates from rates collection
function getArrayOfDates(){
    var dateArrayNew=[];
    var dateArray = db.rates.find({},{_id:0,"Date":1}).toArray();
    for (var t = 0; t < dateArray.length; t++){
        dateArrayNew[t] = dateArray[t]["Date"];
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
    var dateArray = getArrayOfDates();
    var begin = dateArray.sort(compareNumeric).slice(0,1)
    var end = dateArray.sort(compareNumeric).reverse().slice(0,1); 
    var beginDate = begin[0] ;
    var endDate = end[0];
    db.cashFlow.remove({});
    db.transactions.createIndex({"Date":1});
    // for(var i = 0; i < dateArray.length; i++){
        while(beginDate <= endDate){
        var transactionsOfDateArray = db.getCollection('transactions').find({Date:beginDate}).toArray();
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
                "Date":beginDate,
                "Byr":Byr,
                "Byn":Byn,
                "Usd":Usd
        });
        beginDate = new Date(beginDate.setDate(beginDate.getDate()+1));
    }
}
create();