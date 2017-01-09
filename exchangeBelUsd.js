//function  to update cashFlow collection in period
function cashFlowUpdate(beginDate,endDate,byr,byn,usd){
    var Byr = byr;
    var Byn = byn;
    var Usd = usd;
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
        db.cashFlow.update({
                "Date":beginDate},{$set:{
                "Byr":Byr,
                "Byn":Byn,
                "Usd":Usd
        }});
        beginDate = new Date(beginDate.setDate(beginDate.getDate()+1));
    }
};


//main function 
function exchange(){
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var ratesArray = db.rates.find({}).sort({Date:1}).toArray();
    var denominationDate = new Date(2016,06,01,03,0,0,0);

    for(var i = 0; i < cashFlowArray.length; i++){
        var usd = cashFlowArray[i].Usd;
        var byr = cashFlowArray[i].Byr;
        var byn = cashFlowArray[i].Byn;
        // if(cashFlowArray[i]["Date"] < denominationDate){
            if((byr < 0) && (usd > 0)){
                var byrPlus = Math.abs(byr);
                var needUsd = Math.floor(byrPlus/ratesArray[i]["Rate"]);
                    if(needUsd > usd) {
                        var ammountUsd = usd;
                        byr += Math.floor(usd*ratesArray[i]["Rate"]);
                        usd = 0;
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Usd",
                            "Ammount": ammountUsd
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byr":byr,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    }else if(needUsd < usd){
                        usd -= needUsd;
                        byr += Math.floor(needUsd*ratesArray[i]["Rate"]);
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Usd",
                            "Ammount": needUsd
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byr":byr,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    };
            }else if((byr > 0)&&(usd < 0)){
                var usdPlus = Math.abc(usd);
                var needByr = Math.floor(usdPlus*ratesArray[i]["Rate"]);
                    if(needByr > byr){
                        var ammountByr = byr;
                        usd += Math.floor(byr/ratesArray[i]["Rate"]);
                        byr = 0;
                        b.transactions.insertOne({
                                "Date": cashFlowArray[i]["Date"],
                                "Type": "exchange",
                                "Currency": "Byr",
                                "Ammount": ammountByr
                            });
                            db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byr":byr,"Usd":usd}});
                            cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    }else if(needByr < byr){
                        byr -= needByr;
                        usd += Math.floor(needByr/ratesArray[i]["Rate"]);
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Byr",
                            "Ammount": needByr
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byr":byr,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    };
            }
        // }else if(cashFlowArray[i]["Date"] >= denominationDate){
            byn = Math.round(byr/10000);
            byr = 0;

            if((byn < 0) && (usd > 0)){
                var bynPlus = Math.abs(byn);
                var needUsd = Math.floor(bynPlus/ratesArray[i]["Rate"]);
                    if(needUsd > usd) {
                        var ammountUsd = usd;
                        byn += Math.floor(usd*ratesArray[i]["Rate"]);
                        usd = 0;
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Usd",
                            "Ammount": ammountUsd
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byn":byn,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    }else if(needUsd < usd){
                        usd -= needUsd;
                        byn += Math.floor(needUsd*ratesArray[i]["Rate"]);
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Usd",
                            "Ammount": needUsd
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byn":byn,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    };
            }else if((byn > 0)&&(usd < 0)){
                var usdPlus = Math.abc(usd);
                var needByn = Math.floor(usdPlus*ratesArray[i]["Rate"]);
                    if(needByn > byn){
                        var ammountByn = byn;
                        usd += Math.floor(byn/ratesArray[i]["Rate"]);
                        byn = 0;
                        b.transactions.insertOne({
                                "Date": cashFlowArray[i]["Date"],
                                "Type": "exchange",
                                "Currency": "Byn",
                                "Ammount": ammountByn
                            });
                            db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byn":byn,"Usd":usd}});
                            cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    }else if(needByn < byn){
                        byn -= needByn;
                        usd += Math.floor(needByn/ratesArray[i]["Rate"]);
                        db.transactions.insertOne({
                            "Date": cashFlowArray[i]["Date"],
                            "Type": "exchange",
                            "Currency": "Byn",
                            "Ammount": needByn
                        });
                        db.cashFlow.update({Date:cashFlowArray[i]["Date"]},{$set:{"Byn":byn,"Usd":usd}});
                        cashFlowUpdate(cashFlowArray[i+1]["Date"],cashFlowArray[cashFlowArray.length-1]["Date"],byr,byn,usd);
                    };
            }

        }
    // }

}
exchange();