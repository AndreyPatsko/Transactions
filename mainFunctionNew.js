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

// main function
function run(){
    var operationsArray = db.getCollection("operations").find({}).toArray();
    accountCreate(operationsArray);
    categoriesCreate(operationsArray);
}
run();

