// generate array of phone transactions
// return array of objects where every object is - year, month:day
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