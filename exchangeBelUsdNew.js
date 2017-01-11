//main function
function exchange(){
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var ratesArray = db.rates.find({}).sort({Date:1}).toArray();
    for(var i = 0; i < cashFlowArray.length; i++){

        var usd = cashFlowArray[i]['Usd'];
        var byr = cashFlowArray[i]['Byr'];
        var byn = cashFlowArray[i]['Byn'];

        if((usd > 0)&&(byr < 0)){
            var byrPlus = Math.abs(byr);
            var needUsd = Math.ceil(byrPlus/ratesArray[i]["Rate"]);
            if(needUsd > usd){
                var ammountUsd = usd;
                var ammountByr = Math.ceil(usd*ratesArray[i]["Rate"]);
                byr += ammountByr;
                usd = 0;
                db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Usd",
                            "Ammount": ammountUsd
                });
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Byr'] += ammountByr;
                        cashFlowArray[i]['Usd'] += ammountUsd;
                    }
            }else if(needUsd < usd){
                var ammountUsd = needUsd;
                var ammountByr = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                usd -= ammountUsd;
                byr += ammountByr;
                db.transactions.insertOne({
                        "Date": cashFlowArray[i]["Date"],
                        "Type": "exchange",
                        "Currency": "Usd",
                        "Ammount": needUsd
                });
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Byr'] += ammountByr;
                        cashFlowArray[i]['Usd'] += ammountUsd;
                    }
            }
        }else if((usd < 0)&&(byr > 0)){
            var usdPlus = Math.abc(usd);
            var needByr = Math.ceil(usdPlus*ratesArray[i]["Rate"]);
                if(needByr > byr){
                    var ammountByr = byr;
                    var ammountUsd = Math.ceil(byr/ratesArray[i]["Rate"]);
                    usd += ammountUsd;
                    byr = 0;
                    db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Byr",
                            "Ammount": ammountByr
                    });
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Byr'] += ammountByr;
                        cashFlowArray[i]['Usd'] += ammountUsd;
                    }
                }else if(needByr < byr){
                    var ammountUsd = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                    var ammountByr = needByr;
                    byr -= ammountByr;
                    usd += ammountUsd;
                    db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Byr",
                            "Ammount": needByr
                    });
                }
        }
        
    }
}