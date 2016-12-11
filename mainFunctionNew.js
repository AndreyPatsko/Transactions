// function generate random number between min and max
function randomMinMax (min,max) {
    return (min + Math.random()*(max - min))
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

// main function
function run(){
    var beginDate,endDate;
    var denominationDate = new Date(2016,06,01);
//getting array of operations from collection operations
    var operationsArray = db.getCollection("operations").find({}).toArray();
//createing collection of accounts and collection of categories
    accountCreate(operationsArray);
    categoriesCreate(operationsArray);
//hetting array of dates from the collection rates and get beginDate and endDate   
    var dateArray = getArrayOfDates();
    var begin = dateArrayNew.sort(compareNumeric).slice(0,1)
    var end = dateArrayNew.sort(compareNumeric).reverse().slice(0,1);
    beginDate = begin[0];
    endDate = end[0];


}
run();

