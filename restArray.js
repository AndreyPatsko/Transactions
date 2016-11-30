// generate array of rest transactions
// return array of objects where every object is - year, month - array with 4 days
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