//main function
function exchange(){
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var ratesArray = db.rates.find({}).sort({Date:1}).toArray();
    var denominationDate = new Date(2016,06,01,03,0,0,0);
    for(var i = 0; i < cashFlowArray.length; i++){
        
        var usd = cashFlowArray[i]['Usd'];
        var byr = cashFlowArray[i]['Byr'];
        var byn = cashFlowArray[i]['Byn'];
        var date = cashFlowArray[i]["Date"];

        if( date < denominationDate){

                if((usd > 0)&&(byr < 0)){
                    var byrPlus = Math.abs(byr);
                    var needUsd = Math.ceil(byrPlus/ratesArray[i]["Rate"]);
                    if(needUsd > usd){
                        var ammountUsd = 0 - usd;
                        var ammountByr = Math.ceil(usd*ratesArray[i]["Rate"]);
                        byr += ammountByr;
                        usd = 0;
                        db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "exchange",
                                    "Currency": "Usd",
                                    "Ammount": Math.abs(ammountUsd)
                        });
                        cashFlowArray[i]['Usd'] = usd;
                        cashFlowArray[i]['Byr'] = byr;
                        cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                    }else if(needUsd < usd){
                        var ammountUsd =  0 - needUsd;
                        var ammountByr = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                        usd -= needUsd;
                        byr += ammountByr;
                        db.transactions.insertOne({
                                "Date": cashFlowArray[i]["Date"],
                                "Type": "exchange",
                                "Currency": "Usd",
                                "Ammount": needUsd
                        });
                        cashFlowArray[i]['Usd'] = usd;
                        cashFlowArray[i]['Byr'] = byr;
                        cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                    }
                }else if((usd < 0)&&(byr > 0)){
                    var usdPlus = Math.abs(usd);
                    var needByr = Math.ceil(usdPlus*ratesArray[i]["Rate"]);
                        if(needByr > byr){
                            var ammountByr = 0 - byr;
                            var ammountUsd = Math.ceil(byr/ratesArray[i]["Rate"]);
                            usd += ammountUsd;
                            byr = 0;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "exchange",
                                    "Currency": "Byr",
                                    "Ammount": Math.abs(ammountByr)
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                        }else if(needByr < byr){
                            var ammountUsd = Math.ceil(needByr/ratesArray[i]["Rate"]);
                            var ammountByr = 0 - needByr;
                            byr -= needByr;
                            usd += ammountUsd;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "exchange",
                                    "Currency": "Byr",
                                    "Ammount": needByr
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                        }
                }
        }else if(date >= denominationDate){
           
                    if((date >= denominationDate)&&(byr != 0)){
                                byn += Math.round(byr/10000);
                                byr = 0;
                                cashFlowArray[i]['Byn'] = byn;
                                cashFlowArray[i]['Byr'] = byr;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                            cashFlowArray[j]['Byr'] = byr; 
                                            cashFlowArray[j]['Byn'] += byn;  
                                }
                    }
                                
                    if((usd > 0)&&(byn < 0)){
                        var bynPlus = Math.abs(byn);
                        var needUsd = Math.ceil(bynPlus/ratesArray[i]["Rate"]);
                        if(needUsd > usd){
                            var ammountUsd = 0 - usd;
                            var ammountByn = Math.ceil(usd*ratesArray[i]["Rate"]);
                            byn += ammountByn;
                            usd = 0;
                            db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "exchange",
                                        "Currency": "Usd",
                                        "Ammount": Math.abs(ammountUsd)
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                        }else if(needUsd < usd){
                            var ammountUsd = 0 - needUsd;
                            var ammountByn = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                            usd -= needUsd;
                            byn += ammountByn;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "exchange",
                                    "Currency": "Usd",
                                    "Ammount": needUsd
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                        }
                    }else if((usd < 0)&&(byn > 0)){
                        var usdPlus = Math.abs(usd);
                        var needByn = Math.ceil(usdPlus*ratesArray[i]["Rate"]);
                            if(needByn > byn){
                                var ammountByn = 0 - byn;
                                var ammountUsd = Math.ceil(byn/ratesArray[i]["Rate"]);
                                usd += ammountUsd;
                                byn = 0;
                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "exchange",
                                        "Currency": "Byn",
                                        "Ammount": Math.abs(ammountByn)
                                });
                                cashFlowArray[i]['Usd'] = usd;
                                cashFlowArray[i]['Byr'] = byr;
                                cashFlowArray[i]['Byn'] = byn;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                            }else if(needByn < byn){
                                var ammountUsd = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                                var ammountByn = 0 - needByn;
                                byn -= needByn;
                                usd += ammountUsd;
                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "exchange",
                                        "Currency": "Byn",
                                        "Ammount": needByn
                                });
                                cashFlowArray[i]['Usd'] = usd;
                                cashFlowArray[i]['Byr'] = byr;
                                cashFlowArray[i]['Byn'] = byn;
                                    for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                            }
                    }
        } 
    }
    db.cashFlow.remove({});
    db.cashFlow.insertMany(cashFlowArray,{"ordered":false,w:0})
}
exchange();