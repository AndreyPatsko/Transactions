// generate array of Utilities,phone transactions
// return array of objects where every object is - year, month:day
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