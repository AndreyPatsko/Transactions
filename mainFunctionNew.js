function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}
// function generate random number between min and max
function randomMinMax (min,max) {
    return (min + Math.random()*(max - min))
}
// function generate random Date between min and max
function randomMinMaxDate (min,max) {
    return new Date(min + Math.random()*(max - min))
}
//function random кратное num
function randMinMaxDay(min,max){
      return Math.floor(Math.floor(Math.random()*(max-min+1)+min)/86400000)*86400000
}
// function create randomAmount from min and max 
function randomAmount(min,max,currency) {
    var random = 0;
    random = min + Math.random()*(max - min);
    if((currency == "Byr")||(currency == "Usd")){
        return Math.round(random);
    }
    else if (currency == "Byn"){
        return +(random.toFixed(2));
    }
    else {
        // console.log("Input right value.")
    }
}
//function create accounts from array of operations
function accountCreate(array){
    var accountArray = [];
    for(var i = 0; i < array.length; i++){
        var currency = array[i]["Currency"];
        var account = array[i]["Account"];
        accountArray[i] = {"_id":account+currency,"accountName":account+currency,"currency":currency,"amount":0};
    }
    db.accounts.insertMany(accountArray,{"ordered":false,w:0})
}
//function create categories from array of operations
function categoriesCreate(array){
    var categoriesArray = [];
    for(var i = 0; i < array.length; i++){
        var name = array[i]["Operation"];
        categoriesArray[i] = {"_id":name,"categoryName": name};
    }
    db.categories.insertMany(categoriesArray,{"ordered":false,w:0});
}

//function get array of dates from rates collection
function getArrayOfDates(){
    var dateArrayNew=[];
    var dateArray = db.rates.find({},{_id:0,"Date":1}).toArray();
    for (var t = 0; t < dateArray.length; t++){
       // dateArrayNew[t]=new Date(Date.parse(dateArray[t].Date))
       dateArrayNew[t] = dateArray[t]["Date"];
    }
    return dateArrayNew;
}
//function generates random dates in year. return array of objects with "date"
function generateRandomInYears(begin,end,rate){
    var array = [];
    var beginPeriod = new Date(begin);
    while(beginPeriod < end) {
        var endPeriod = new Date(beginPeriod);
        endPeriod = new Date(endPeriod.setFullYear(endPeriod.getFullYear()+1));
        if(endPeriod > end) {
            endPeriod = new Date(end);
        }
        var localArray = [];
            while(localArray.length < rate){
                var randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());   //проверить
                while((isNaN(randomDate)||(localArray.indexOf(randomDate) !== -1))){                     //првоерить
                    randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());
                }
            localArray.push(randomDate) 
            }
        for(var i = 0 ; i < localArray.length;i++){
            var obj = {};
            obj["Date"] = new Date(localArray[i]);  //проверить 
            array.push(obj);    
        }
        beginPeriod = new Date(endPeriod);
        }   
    return array;
}
//function generates random dates in month. return array of objects with "date"
function generateRandomInMonth(begin,end,rate){
    var array = [];
    var beginPeriod = new Date(begin);
    while(beginPeriod < end) {
        var endPeriod = new Date(beginPeriod);
        endPeriod = new Date(endPeriod.setMonth(endPeriod.getMonth()+1));
        if(endPeriod > end) {
            endPeriod = new Date(end);
        }
        var localArray = [];
            while(localArray.length < rate){
                var randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());   //проверить
                while((isNaN(randomDate)||(localArray.indexOf(randomDate) !== -1))){                     //првоерить
                    randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());
                }
            localArray.push(randomDate);    
            }
        for(var i = 0 ; i < localArray.length;i++){
            var obj = {};
            obj["Date"] = new Date(localArray[i]);  //проверить 
            array.push(obj);    
        }
        beginPeriod = new Date(endPeriod);
        }   
    return array;
}
//function generates random dates in week. return array of objects with "date"
function generateRandomInWeek(begin,end,rate){
    var array = [];
    var beginPeriod = new Date(begin);
        while(beginPeriod < end){
        var endPeriod = new Date(beginPeriod);
        endPeriod = new Date(endPeriod.setDate(endPeriod.getDate()+6));
        if (endPeriod > end){
            endPeriod = new Date(end);
        }
        var localArray = [];
            while(localArray.length < rate){
                var randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());   //проверить
                while((isNaN(randomDate)||(localArray.indexOf(randomDate) !== -1))){                     //првоерить
                    randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());
                }
            localArray.push(randomDate);    
            }
        for(var i = 0 ; i < localArray.length;i++){
            var obj = {};
            obj["Date"] = new Date(localArray[i]);  //проверить 
            array.push(obj);    
        }
        beginPeriod = new Date(endPeriod);
        beginPeriod = new Date(beginPeriod.setDate(beginPeriod.getDate()+1));
        }   
    return array;
}

var operationsNamesArrays = {
    "Grocery Shopping":["Buy beer","Buy chips","Buy milk","Buy suasages","Buy pelmeni"],
    "Transport":["Buy monthly pass","Take taxi"],
    "Study":["Part of payment 1","Part of payment 2","Bride teacher"],
    "House Rent":["Payment to owner 1","Payment to owner 2"],
    "Utilities":["Payment for water","Payment for gas","Payment for TV"],
    "Clothes Shopping":["Buy guins","Buy shirt","Buy boots","Buy jacket"],
    "Rest":["Go to the cinema","Go to the bar","Go to Zoo","Go to the theatre"],
    "Phone":["Pay for mobile","Promised payment"],
    "Parents":["Celebration 1","Celebration 2","Humanitarian relief"],
    "Salary":["Prepayment","Main payment","Other sources of income"],
    "Internet":["Pay to ByFly 1","Pay to ByFly 2"],
    "Phone, Internet":["Pay to MTS","Pay to Velcome"],
    "Utilities, Phone":["Pay for mobile to MTS","Pay for mobile to Velcome"]
}
// main function
function run(){
    var beginDate,endDate;
    var denominationDate = new Date(2016,06,01);
//getting array of dates from the collection rates and get beginDate and endDate   
    var dateArray = getArrayOfDates();
    var begin = dateArray.sort(compareNumeric).slice(0,1);
    var end = dateArray.sort(compareNumeric).reverse().slice(0,1); 
//getting array of operations from collection operations
    var operationsArray = db.getCollection("operations").find({}).toArray();
//createing collection of accounts and collection of categories
    accountCreate(operationsArray);
    categoriesCreate(operationsArray);
//work with array of operations
    for(var i = 0; i < operationsArray.length; i++){
// get start date and finish date depends of Currency of operation
        if(operationsArray[i]["Currency"] == "Byr"){
            beginDate = begin[0];
            endDate = denominationDate;
        }else if(operationsArray[i]["Currency"] == "Byn"){
            beginDate = new Date(2016,06,01,03,0,0,0);
            endDate = end[0];
        }else {
            beginDate = begin[0];
            endDate = end[0];
        }
// generate array of dates depends of period of operation
        switch (operationsArray[i]["Period"]) {
                case "Year":
                    var dateArray = generateRandomInYears(beginDate,endDate,operationsArray[i]["Rate"]);
                    break;
                case "Month":
                    var dateArray = generateRandomInMonth(beginDate,endDate,operationsArray[i]["Rate"]);
                    break;
                case "Week":
                    var dateArray = generateRandomInWeek(beginDate,endDate,operationsArray[i]["Rate"]);
                    break;
            }
        var accountForOperation = operationsArray[i]["Account"]+operationsArray[i]["Currency"];   
        var neededAccountArray = db.accounts.find({"accountName":accountForOperation}).toArray(); 
        var categoryForOperation = operationsArray[i]["Operation"];   
        var neededCategorytArray = db.categories.find({"categoryName":categoryForOperation}).toArray();    
//make array of transactions from array of dates adding need fields   
        for(var j = 0; j < dateArray.length; j++){
            var randomOperationName = Math.round((0 + Math.random()*((operationsNamesArrays[operationsArray[i]["Operation"]].length -1)- 0)))

            dateArray[j]["Type"] = operationsArray[i]["Type"];
            dateArray[j]["OperationName"] = operationsNamesArrays[operationsArray[i]["Operation"]][randomOperationName];
            dateArray[j]["Currency"] = operationsArray[i]["Currency"];
            dateArray[j]["Amount"] = randomAmount(operationsArray[i]["AmountMin"],operationsArray[i]["AmountMax"],operationsArray[i]["Currency"]);
            dateArray[j]["AccountId"] = neededAccountArray[0]["_id"];
            dateArray[j]["CategoryId"] = neededCategorytArray[0]["_id"];
        }
//insert array of transactions into collection transactions
         db.transactions.insertMany(dateArray,{"ordered":false,w:0});
    }
   
}
run();



