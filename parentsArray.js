// generate array of parents transactions
// return array of objects where every object is - year, month:day 3 in year
function parents(){
    var day,month;
    var parentsArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        parentsArray[k] = {};
        
        for(var j = 0; j<6; j++){
            var monthArray = [];
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            parentsArray[k][month] = day;
        }
    }
    return parentsArray;
}