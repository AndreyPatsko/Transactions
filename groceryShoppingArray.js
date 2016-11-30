// generate array of grocery shopping transactions
// return array of objects where every object is - year, month - array with 12 days
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