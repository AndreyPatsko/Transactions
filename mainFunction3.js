function randomMinMax (min,max) {
    // function generate random number between min and max
    return (min + Math.random()*(max - min))
}

function randomDayInMonth(year,month) {
    //function gemerate random day in carrent month and year
    var day31Monthes = [1,3,5,7,8,10,12];
    var day30Monthes = [4,6,9,11];
            if (day31Monthes.indexOf(month) !== -1){
                day = Math.round(randomMinMax(1,31));
            }else if ( day30Monthes.indexOf(month) !== -1){
                day = Math.round(randomMinMax(1,30));
            }else if ((month == 2)&&(year%4 ==0)){
                day = Math.round(randomMinMax(1,29));
            }else {
                day = Math.round(randomMinMax(1,28));
            }
        return day;
}

function randomAmmount(min,max,currency) {
    var random = 0;
    random = min + Math.random()*(max - min);
    console.log(random);
    if((currency == "Byr")||(currency == "Usd")){
        return Math.round(random);
    }
    else if (currency == "Byn"){
        return +(random.toFixed(2));
    }
    else {
        console.log("Input right value.")
    }
}


function generateRandomInYears(begin,end,array,collectionOfTransactions){
    //function generate random days in year and make transactions
    var finalArray = [];
    var rate = array.rate;
    var currency = array.currency;
    for(var i = begin.getFullYear(),k=0; i <= end.getFullYear(); i++,k++){
        finalArray[k] = {};
        monthArray = [];
        for(var j = 0; j < rate; j++){
            
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            finalArray[k][month] = day;
        }
    }
    for(var q = 0, z = 2010+q; q < finalArray.length ;q++){
        for(key in finalArray[q]){
            var dateOfTransaction = new Date(z,key,finalArray[q].key); //ну тут как-то дату вставить..
        }
        var ammount = randomAmmount(array.ammountMin,array.ammountMax,currency);
        var randomTransactionName = Math.round((0 + Math.random()*((array["transaction name"].length -1)- 0)))
        
             db.collectionOfTransactions.insertOne({
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

function generateRandomInMonth(begin,end,array,collectionOfTransactions){
    
    var periodRate = array.rate;
    var finalArray = [];
    var currency = array.currency;

    for(var i = begin.getFullYear(),k = 0; i <= end.getFullYear(); i++,k++){
        finalArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            finalArray[k][j] = [];
                while(l < periodRate){
            
                    var day = randomDayInMonth(i,j); 
                    finalArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    for(var q = 0, z = 2010+q; q < finalArray.length;q++){
        for(key in finalArray[q]){
            for(var y = 0; y < finalArray[q][key].length; y++){
            var dateOfTransaction = new Date(z,key,finalArray[q][key][y]); //ну тут как-то дату вставить..
            
            var ammount = randomAmmount(array.ammountMin,array.ammountMax,currency);
            var randomTransactionName = Math.round((0 + Math.random()*((array["transaction name"].length -1)- 0)))
        
             db.collectionOfTransactions.insertOne({
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
        
    }              
}

function generateRandomInWeek(begin,end,array,collectionOfTransactions){
    var periodRate = array.rate;
    var finalArray = {};
    var currency = array.currency;
    for(var i = begin.getFullYear(); i <= end.getFullYear(); i++){
        finalArray[i] = [];
        for(var j = 1; j <= 358; j + 7){
            var daysArray = [];
            while(daysArray.length !== periodRate){
                var day = Math.round(randomMinMax(j,j+6));
                while(daysArray.indexOf(day) !== -1){
                    day = Math.round(randomMinMax(j,j+6));
                }
                daysArray.push(day);
            }
            finalArray[i] = finalArray[i].concat(daysArray);
        }
    }
    for(key in finalArray){
        for(var x=0; x < finalArray[key].length; x++){
            var dateOfTransaction = new Date(key,0,finalArray[key][x]); //ну тут как-то дату вставить..
            
            var ammount = randomAmmount(array.ammountMin,array.ammountMax,currency);
            var randomTransactionName = Math.round((0 + Math.random()*((array["transaction name"].length -1)- 0)))
        
             db.collectionOfTransactions.insertOne({
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

}

function run(db,collection,collectionDates){
    // var dateArrayNew=[];
    // var dateArray = db.collection.find({},{_id:0,"date":1}).toArray();
    // for (var t = 0; t < dateArray.length; t++){
    //     dateArrayNew[t]=new Date(Date.parse(dateArray[t].date))
    // }

    //сюда вставить функцию переделывания дат в курсах проверка иф стринг
    var beginDate = ISODate("2010-01-01T22:00:00.000Z") ;
    var endDate = ISODate("2016-11-24T21:00:00.000Z");
    var categoriesArray = db.collection.find({}).toArray();
        for(var i = 0; i < categoriesArray.length; i++){
            switch (categoriesArray[i].period) {
                case "Year":
                    generateRandomInYears(beginDate,endDate,categoriesArray[i],transactions);
                    break;
                case "Month":
                    generateRandomInMonth(beginDate,endDate,categoriesArray[i],transactions);
                    break;
                case "Week":
                    generateRandomInWeek(beginDate,endDate,categoriesArray[i],transactions);
                    break;
                
            }
        }
}



// var myDay = "1/4/2010";
// var converted = Date.parse(myDay);
// var myDate = new Date(converted);
// print(myDate)


// function compareNumeric(a, b) {
//   if (a > b) return 1;
//   if (a < b) return -1;
// }
// var dateArrayNew=[];
//     var dateArray = db.rates.find({},{_id:0,"date":1}).toArray();
//     for (var t = 0; t < dateArray.length; t++){
//         dateArrayNew[t]=new Date(Date.parse(dateArray[t].date))
//     }
// //     dateArrayNew.sort(compareNumeric)     new Date(Date.parse(dateArray[t].date))
//     dateArrayNew