//main function
function exchange(){
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var ratesArray = db.rates.find({}).sort({Date:1}).toArray();
    var denominationDate = new Date(2016,06,01,03,0,0,0);
    for(var i = 0; i < cashFlowArray.length; i++){
        
        var usd = cashFlowArray[i]['Usd'];
        var byr = cashFlowArray[i]['Byr'];
        var byn = cashFlowArray[i]['Byn'];
        
        if( cashFlowArray[i]["Date"] < denominationDate){

                if((usd > 0)&&(byr < 0)){
                    var byrPlus = Math.abs(byr);
                    var needUsd = Math.ceil(byrPlus/ratesArray[i]["Rate"]);
                    if(needUsd > usd){
                        var ammountByr = Math.ceil(usd*ratesArray[i]["Rate"]);
                        var ammountUsd = 0 - usd;
                        byr += ammountByr;
                        usd = 0;
                        db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Exp",
                                    "Currency": "Usd",
                                    "Amount": Math.abs(ammountUsd),
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                        });
                        db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Byr",
                                    "Amount": ammountByr,
                                    "AccountId":"PurseByr",
                                    "OperationName" : "Currency Exchange"
                        });
                        
                        cashFlowArray[i]['Usd'] = usd;
                        cashFlowArray[i]['Byr'] = byr;
                        cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                    }else if(needUsd < usd){
                        var ammountByr = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                        var ammountUsd =  0 - needUsd;
                        usd -= needUsd;
                        byr += ammountByr;
                        db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Exp",
                                    "Currency": "Usd",
                                    "Amount": Math.abs(ammountUsd),
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                        });
                        db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Byr",
                                    "Amount": ammountByr,
                                    "AccountId":"PurseByr",
                                    "OperationName" : "Currency Exchange"
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
                            
                            var ammountUsd = Math.floor(byr/ratesArray[i]["Rate"]);
                            var ammountByr = 0 - ammountUsd*ratesArray[i]["Rate"];
                            usd += ammountUsd;
                            byr = byr - Math.abs(ammountByr);
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Usd",
                                    "Amount": ammountUsd,
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                            });
                            db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Exp",
                                        "Currency": "Byr",
                                        "Amount": Math.abs(ammountByr),
                                        "AccountId":"PurseByr",
                                        "OperationName" : "Currency Exchange"
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                            for(var j = i+1;j < cashFlowArray.length; j++){
                                cashFlowArray[j]['Byr'] += ammountByr;
                                cashFlowArray[j]['Usd'] += ammountUsd;
                            }
                        }else if(needByr < byr){
                            var ammountUsd = usdPlus;
                            var ammountByr = 0 - ammountUsd*ratesArray[i]["Rate"];
                            byr = byr - Math.abs(ammountByr);
                            usd += ammountUsd;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Usd",
                                    "Amount": ammountUsd,
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                            });
                            db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Exp",
                                        "Currency": "Byr",
                                        "Amount": Math.abs(ammountByr),
                                        "AccountId":"PurseByr",
                                        "OperationName" : "Currency Exchange"
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
        }else if(cashFlowArray[i]["Date"] >= denominationDate){
           
                    if((cashFlowArray[i]["Date"] >= denominationDate)&&(byr != 0)){
                                var ammountByr = byr;
                                var newByn = Math.round(ammountByr/10000);
                                byn += newByn;
                                byr = 0;
                                cashFlowArray[i]['Byn'] = byn;
                                cashFlowArray[i]['Byr'] = byr;

                                var PurseByrExp = db.transactions.aggregate([{$match:{"AccountId":"PurseByr",Type:"Exp"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();
                                var CardByrExp = db.transactions.aggregate([{$match:{"AccountId":"CardByr",Type:"Exp"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();
                                var CardByrInc = db.transactions.aggregate([{$match:{"AccountId":"CardByr",Type:"Inc"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();


                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Exp",
                                        "Currency": "Byr",
                                        "Amount":0 - PurseByrExp[0].Amount,
                                        "AccountId":"PurseByr",
                                        "OperationName" : "Transfer"
                                });
                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Exp",
                                        "Currency": "Byr",
                                        "Amount": CardByrInc[0].Amount - CardByrExp[0].Amount,
                                        "AccountId":"CardByr",
                                        "OperationName" : "Transfer"
                                });
                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Inc",
                                        "Currency": "Byn",
                                        "Amount": 0 - Math.round(PurseByrExp[0].Amount/10000),
                                        "AccountId":"PurseByn",
                                        "OperationName" : "Transfer"
                                });
                                db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Inc",
                                        "Currency": "Byn",
                                        "Amount":0 - Math.round((CardByrInc[0].Amount - CardByrExp[0].Amount)/10000),
                                        "AccountId":"PurseByr",
                                        "OperationName" : "Transfer"
                                });
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                            cashFlowArray[j]['Byr'] = byr; 
                                            cashFlowArray[j]['Byn'] += byn;  
                                }
                    }
                                
                    if((usd > 0)&&(byn < 0)){
                        var bynPlus = Math.abs(byn);
                        var needUsd = Math.ceil(bynPlus/ratesArray[i]["Rate"]);
                        if(needUsd > usd){
                            var ammountByn = Math.ceil(usd*ratesArray[i]["Rate"]);
                            var ammountUsd = 0 - usd;
                            byn += ammountByn;
                            usd = 0;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Exp",
                                    "Currency": "Usd",
                                    "Amount": Math.abs(ammountUsd),
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                            });
                            db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Inc",
                                        "Currency": "Byn",
                                        "Amount": ammountByn,
                                        "AccountId":"PurseByn",
                                        "OperationName" : "Currency Exchange"
                            });
                            cashFlowArray[i]['Usd'] = usd;
                            cashFlowArray[i]['Byr'] = byr;
                            cashFlowArray[i]['Byn'] = byn;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                        }else if(needUsd < usd){
                            var ammountByn = Math.ceil(needUsd*ratesArray[i]["Rate"]);
                            var ammountUsd =  0 - needUsd;
                            usd -= needUsd;
                            byn += ammountByn;
                            db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Exp",
                                    "Currency": "Usd",
                                    "Amount": Math.abs(ammountUsd),
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                            });
                            db.transactions.insertOne({
                                        "Date": cashFlowArray[i]["Date"],
                                        "Type": "Inc",
                                        "Currency": "Byn",
                                        "Amount": ammountByn,
                                        "AccountId":"PurseByn",
                                        "OperationName" : "Currency Exchange"
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
                                var ammountUsd = Math.floor(byn/ratesArray[i]["Rate"]);
                                var ammountByn = 0 - ammountUsd*ratesArray[i]["Rate"];
                                usd += ammountUsd;
                                byn = byn - Math.abs(ammountByn);
                                db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Usd",
                                    "Amount": ammountUsd,
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                                });
                                db.transactions.insertOne({
                                            "Date": cashFlowArray[i]["Date"],
                                            "Type": "Exp",
                                            "Currency": "Byn",
                                            "Amount": Math.abs(ammountByn),
                                            "AccountId":"PurseByn",
                                            "OperationName" : "Currency Exchange"
                                });
                                cashFlowArray[i]['Usd'] = usd;
                                cashFlowArray[i]['Byr'] = byr;
                                cashFlowArray[i]['Byn'] = byn;
                                for(var j = i+1;j < cashFlowArray.length; j++){
                                    cashFlowArray[j]['Byn'] += ammountByn;
                                    cashFlowArray[j]['Usd'] += ammountUsd;
                                }
                            }else if(needByn < byn){
                                var ammountUsd = usdPlus;
                                var ammountByn = 0 - ammountUsd*ratesArray[i]["Rate"];
                                byn = byn - Math.abs(ammountByn);
                                usd += ammountUsd;
                                db.transactions.insertOne({
                                    "Date": cashFlowArray[i]["Date"],
                                    "Type": "Inc",
                                    "Currency": "Usd",
                                    "Amount": ammountUsd,
                                    "AccountId":"SafeUsd",
                                    "OperationName" : "Currency Exchange"
                                });
                                db.transactions.insertOne({
                                            "Date": cashFlowArray[i]["Date"],
                                            "Type": "Exp",
                                            "Currency": "Byn",
                                            "Amount": Math.abs(ammountByn),
                                            "AccountId":"PurseByn",
                                            "OperationName" : "Currency Exchange"
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
    // db.cashFlow.remove({});
    // db.cashFlow.insertMany(cashFlowArray,{"ordered":false,w:0})
}
exchange();


// db.transactions.aggregate([{$match:{"AccountId":"PurseByr",Type:"Exp"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}])