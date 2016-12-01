// generate array of salary transactions
// return array of objects where every object is - year, month - array with 2 days
function salary(){
    var day,month;
    var periodRate = 2;
    var salaryArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        salaryArray[k] = {};
        
        for(var j = 1; j<=12; j++){
            var l = 0;
            salaryArray[k][j] = [];
                while(l < periodRate){
            
                    day = randomDayInMonth(i,j); 
                    salaryArray[k][j].push(day);
                    l++
                }

            l=0;
        }
    }
    return salaryArray;
}