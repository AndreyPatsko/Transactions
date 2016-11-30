// generate array of internet transactions
// return array of objects where every object is - year, month:day
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