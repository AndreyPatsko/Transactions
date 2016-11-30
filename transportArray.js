// generate array of transport transactions
// return array of objects where every object is - year, month - array with 2 days
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