/// main function to generate transactions
function randomMinMax (min,max) {
    return (min + Math.random()*(max - min))
}
function randomDayInMonth(year,month) {
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
function phone(){
    var day,month;
    var phoneArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        phoneArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            phoneArray[k][j] = day;
        }
    }
    return phoneArray;
}

function clothesShopping(){
    var day,month;
    var clothesShoppingArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        clothesShoppingArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            clothesShoppingArray[k][j] = day;
        }
    }
    return clothesShoppingArray;
}
function groceryShopping(){
    var day,month;
    var periodRate = 12;
    var groceryShoppingArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        groceryShoppingArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            groceryShoppingArray[k][j] = [];
                while(l < periodRate){
            
                    day = randomDayInMonth(i,j); 
                    groceryShoppingArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    return groceryShoppingArray;
}
function houseRent(){
    var day,month;
    var houseRentArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        houseRentArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            houseRentArray[k][j] = day;
        }
    }
    return houseRentArray;
}

function internet(){
    var day,month;
    var internetArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        internetArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            internetArray[k][j] = day;
        }
    }
    return internetArray;
}

function parents(){
    var day,month;
    var parentsArray = [];
    var monthArray;
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        parentsArray[k] = {};
        monthArray = [];
        for(var j = 0; j<6; j++){
            
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            parentsArray[k][month] = day;
        }
    }
    return parentsArray;
}
function phoneInternet(){
    var day,month;
    var phoneInternetArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        phoneInternetArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            phoneInternetArray[k][j] = day;
        }
    }
    return phoneInternetArray;
}
function rest(){
    var day,month;
    var periodRate = 4;
    var restArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        restArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            restArray[k][j] = [];
                while(l < periodRate){
            
                    day = randomDayInMonth(i,j); 
                    restArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    return restArray;
}
function salary(){
    var day,month;
    var periodRate = 2;
    var salaryArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        salaryArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            salaryArray[k][j] = [];
                while(l < periodRate){
            
                    day = randomDayInMonth(i,j); 
                    salaryArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    return salaryArray;
}
function study(){
    var day,month,monthArray;
    var studyArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        studyArray[k] = {};
        monthArray = [];
        for(var j = 0; j<3; j++){
           
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            studyArray[k][month] = day;
        }
    }
    return studyArray;
}
function transport(){
    var day,month;
    var periodRate = 2;
    var transportArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        transportArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            transportArray[k][j] = [];
                while(l < periodRate){
            
                    day = randomDayInMonth(i,j); 
                    transportArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    return transportArray;
}
function utilities(){
    var day,month;
    var utilitiesArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        utilitiesArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            utilitiesArray[k][j] = day;
        }
    }
    return utilitiesArray;
}
function utilitiesPhone(){
    var day,month;
    var utilitiesPhoneArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        utilitiesPhoneArray[k] = {};
        for(var j = 1; j<=12; j++){
            day = randomDayInMonth(i,j); 
            utilitiesPhoneArray[k][j] = day;
        }
    }
    return utilitiesPhoneArray;
}
function getArrayOfDateFromCollectionRate (){
var c = db.getCollection('rates').find({},{date:1,_id:0}).toArray();
var b = []
for(var i = 0;i < c.length; i++){
    b.push(c[i].date)
    }
   return b
}

function makeTransaction(day,month,year,name){
    var dateOfTransaction = String(day + "-" +month+"-"+year);
    var currency;
    if ((year >= 2016)&&(month >= 7)){
        currency = "Byn";
    }
    else {
        currency = "Byr";
    }
    var operationx = db.operations.find({"name": name,"currency":currency}).toArray();
    var ammount = Math.round(randomMinMax(operationx[0].ammountMin,operationx[0].ammountMax))
    db.transactions.insertOne({
                            "date":dateOfTransaction,
                            "name":operationx[0].name,
                            "type":operationx[0].type,
                            "ammount":ammount,
                            "currency":currency,
                            "account":operationx[0].account
                                })
}


function run(){
    var phoneArrayOfTransactions = phone();
    var clothesShoppingArrayOfTransactions = clothesShopping();
    var groceryShoppingArrayOfTransactions = groceryShopping();
    var houseRentArrayOfTransactions = houseRent();
    var internetArrayOfTransactions = internet();
    var parentsArrayOfTransactions = parents();
    var phoneInternetArrayOfTransactions = phoneInternet();
    var restArrayOfTransactions = rest();
    var salaryArrayOfTransactions = salary();
    var studyArrayOfTransactions = study();
    var transportArrayOfTransactions = transport();
    var utilitiesArrayOfTransactions = utilities();
    var utilitiesPhoneArrayOfTransactions = utilitiesPhone();
    var dateArray = getArrayOfDateFromCollectionRate();    // add function to gate array of date from rate collection
   
    for(var i=0; i < dateArray.length; i++) {

        var arr = dateArray[i].split("-");
        var dayx = +(arr[1]);
        var monthx = +(arr[0]);
        var yearx = +(arr[2]);
        switch (yearx) {
            case 2010:
                var z = 0;
                break;
            case 2011:
                var z = 1;
                break;
            case 2012:
                var z = 2;
                break;
            case 2013:
                var z = 3;
                break;
            case 2014:
                var z = 4;
                break;
            case 2015:
                var z = 5;
                break;
            case 2016:
                var z = 6;
                break;
        }
        
        if(phoneArrayOfTransactions[z][monthx] == dayx){
            makeTransaction(dayx,monthx,yearx,"Phone");
        }
        if(clothesShoppingArrayOfTransactions[z][monthx] == dayx){
            makeTransaction(dayx,monthx,yearx,"ClothesShopping");
        }
    }
    
}