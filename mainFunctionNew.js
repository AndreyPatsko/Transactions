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
      return new Date(Math.floor(Math.floor(Math.random()*(max-min+1)+min) / 86400000) * 86400000);
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
    var dateArray = db.rates.find({},{_id:0,"date":1}).toArray();
    for (var t = 0; t < dateArray.length; t++){
        dateArrayNew[t]=new Date(Date.parse(dateArray[t].date))
    }
    return dateArrayNew;
}
//function generates random dates in year. return array of objects with "date"
function generateRandomInYears(begin,end,rate){
    var array = [];
    // var beginPeriod = new Date(begin);
    // var endPeriod = new Date(beginPeriod);
    //    if()
    return array;
}
//function generates random dates in month. return array of objects with "date"
function generateRandomInMonth(begin,end,rate){
    var array = [];

    return array;
}
//function generates random dates in week. return array of objects with "date"
function generateRandomInWeek(begin,end,rate){
    var array = [];
    var beginPeriod = new Date(begin);
        while(beginPeriod <= end){
        var endPeriod = new Date(beginPeriod);
        endPeriod = new Date(endPeriod.setDate(endPeriod.getDate()+6))
        var localArray = [];
            while(localArray.length <= rate){
                var randomDate = randMinMaxDay(beginPeriod.getTime(),endPeriod.getTime());
                while(localArray.indexOf(randomDate) !== -1){
                    randomDate = randMinMaxDay(beginPeriod.getTime,endPeriod.getTime);
                }
            localArray.push(randomDate);    
            }
        for(var i = 0 ; i < localArray.length;i++){
            var obj = {};
            obj["Date"] = localArray[i];
            array.push(obj);    
        }
        beginPeriod = new Date(endPeriod);
        }   
        console.log(localArray) ;
    return array;
}

// main function
function run(){
    var beginDate,endDate;
    var denominationDate = new Date(2016,06,01);
//getting array of dates from the collection rates and get beginDate and endDate   
    var dateArray = getArrayOfDates();
    var begin = dateArrayNew.sort(compareNumeric).slice(0,1)
    var end = dateArrayNew.sort(compareNumeric).reverse().slice(0,1); 
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
        }else if(operationsArray[i]["Currency" == "Byn"]){
            beginDate = denominationDate;
            endDate = end[0];
        }else {
            beginDate = begin[0];
            endDate = end[0];
        }
// generate array of dates depends of period of operation
        switch (categoriesArray[i]["Period"]) {
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
//make array of transactions from array of dates adding need fields            
        var transactionsArray = dateArray.map() //not complete yet may be just insert in dateArray new fields not maping
//insert array of transactions into collection transactions
        db.trabsactions.insertMany(transactionsArray,{"ordered":false,w:0});
    }
}
run();



//function random кратное num
// function rand(min,max,num){
//       return Math.floor(Math.floor(Math.random()*(max-min+1)+min) / num) * num;
// }