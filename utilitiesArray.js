// generate array of Utilities transactions
// return array of objects where every object is - year, month:day
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