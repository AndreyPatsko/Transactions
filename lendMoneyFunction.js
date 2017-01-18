//function random min max number
function randomMinMax (min,max) {
    return (min + Math.random()*(max - min))
}

// main function
function lend(){
    var cashFlowArray = db.cashFlow.find({}).sort({Date:1}).toArray();
    var friends = db.friends.find({}).toArray();  // DON`T FOGET RO CREATE COLLECTION FRIENDS
    for (var i = 0 ; i < cashFlowArray.length; i++){
        var usd = cashFlowArray[i]['Usd'];
        var byr = cashFlowArray[i]['Byr'];
        var byn = cashFlowArray[i]['Byn']; 

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
        }else if(byr < 0){
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
        }else if(byn < 0){
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