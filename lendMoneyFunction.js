//function random min max number
function randomMinMax(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

var friendsArray = [
    {"_id":"Vasily","Name":"Vasily"},
    {"_id":"Dmitry","Name":"Dmitry"},
    {"_id":"Sergey","Name":"Sergey"}
]

// main function
function lend(){
    db.friends.insertMany(friendsArray,{"ordered":false,w:0});
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var friends = db.friends.find({}).toArray();  // DON`T FOGET RO CREATE COLLECTION FRIENDS
    var denominationDate = new Date(2016,06,01,03,0,0,0);
    for (var i = 0 ; i < cashFlowArray.length; i++){
        var usd = cashFlowArray[i]['Usd'];
        var byr = cashFlowArray[i]['Byr'];
        var byn = cashFlowArray[i]['Byn']; 

        if((cashFlowArray[i]["Date"] >= denominationDate)&&(byr != 0)){
                byn = 0;
                var ammountByr = byr;
                var newByn = Math.round(ammountByr/10000);
                byn += newByn;
                byr = 0;
                cashFlowArray[i]['Byn'] = byn;
                cashFlowArray[i]['Byr'] = byr;

                var PurseByrExp = db.transactions.aggregate([{$match:{"AccountId":"PurseByr",Type:"Exp"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();
                var PurseByrInc = db.transactions.aggregate([{$match:{"AccountId":"PurseByr",Type:"Inc"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();
                // var CardByrExp = db.transactions.aggregate([{$match:{"AccountId":"CardByr",Type:"Exp"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();
                // var CardByrInc = db.transactions.aggregate([{$match:{"AccountId":"CardByr",Type:"Inc"}},{$group:{_id:null,Amount:{$sum:"$Amount"}}}]).toArray();

                var last = db.transactions.find({Date:cashFlowArray[i]["Date"],"AccountId" : "PurseByr"}).toArray();
                var lastAmount = last[0]["Amount"];
                db.transactions.updateOne({"AccountId":"PurseByr","OperationName" : "Transfer"},
                                          {$set:{"Amount":lastAmount + (PurseByrInc[0].Amount - PurseByrExp[0].Amount)}});

                // db.transactions.updateOne({"AccountId":"CardByr","OperationName" : "Transfer"},
                //                           {$set:{"Amount":(CardByrInc[0].Amount - CardByrExp[0].Amount)}});

                db.transactions.updateOne({"AccountId":"PurseByn","OperationName" : "Transfer"},
                                          {$set:{"Amount":Math.round((lastAmount + (PurseByrInc[0].Amount - PurseByrExp[0].Amount))/10000)}});

                // db.transactions.updateOne({"AccountId":"CardByn","OperationName" : "Transfer"},
                //                           {$set:{"Amount":Math.round((CardByrInc[0].Amount - CardByrExp[0].Amount)/10000)}});

                for(var j = i+1;j < cashFlowArray.length; j++){
                            cashFlowArray[j]['Byr'] = byr; 
                            cashFlowArray[j]['Byn'] += byn;  
                }
        }

        if(usd < 0 ){
            var numberOfFriend = randomMinMax(0,friends.length-1);
            var usdPlus = Math.abs(usd);
            var summOfLend = Math.ceil(usdPlus/100)*100;
            usd += summOfLend;
                db.transactions.insertOne({
                        "Date": cashFlowArray[i]["Date"],
                        "Type": "Inc",
                        "Currency": "Usd",
                        "Amount": summOfLend,
                        "AccountId":"SafeUsd",
                        "OperationName" : "Lend Usd",
                        "FriendId":friends[numberOfFriend]["_id"]
                });
                cashFlowArray[i]["Usd"] = usd;
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Usd'] += summOfLend;
                    };
        }
        if(byr < 0){
            var numberOfFriend = randomMinMax(0,friends.length-1);
            var byrPlus = Math.abs(byr);
            var summOfLend = Math.ceil(byrPlus/1000000)*1000000;
            byr += summOfLend;
                db.transactions.insertOne({
                        "Date": cashFlowArray[i]["Date"],
                        "Type": "Inc",
                        "Currency": "Byr",
                        "Amount": summOfLend,
                        "AccountId":"PurseByr",
                        "OperationName" : "Lend Byr",
                        "FriendId":friends[numberOfFriend]["_id"]
                });
                cashFlowArray[i]["Byr"] = byr;
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Byr'] += summOfLend;
                    };
        }
        if(byn < 0){
            var numberOfFriend = randomMinMax(0,friends.length-1);
            var bynPlus = Math.abs(byn);
            var summOfLend = Math.ceil(bynPlus/100)*100;
            byn += summOfLend;
                db.transactions.insertOne({
                        "Date": cashFlowArray[i]["Date"],
                        "Type": "Inc",
                        "Currency": "Byn",
                        "Amount": summOfLend,
                        "AccountId":"PurseByn",
                        "OperationName" : "Lend Byn",
                        "FriendId":friends[numberOfFriend]["_id"]
                });
                cashFlowArray[i]["Byn"] = byn;
                    for(var j = i+1;j < cashFlowArray.length; j++){
                        cashFlowArray[j]['Byn'] += summOfLend;
                    };
        }

        
    }
}
lend();