// generate array of house rent transactions
// return array of objects where every object is - year, month:day
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