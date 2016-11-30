// generate array of phone,intenet transactions
// return array of objects where every object is - year, month:day
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