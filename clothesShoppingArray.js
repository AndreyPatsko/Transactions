// generate array of clothing shopping transactions
// return array of objects where every object is - year, month:day
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