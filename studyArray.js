// generate array of study transactions
// return array of objects where every object is - year, month:day 3 in year
function study(){
    var day,month;
    var studyArray = [];
        
    for(var i = 2010,k=0; i <=2016; i++,k++){
        studyArray[k] = {};
        
        for(var j = 0; j<3; j++){
            var monthArray = [];
            var month = Math.round(randomMinMax(1,12));
                while(monthArray.indexOf(month) !== -1){
                    month = Math.round(randomMinMax(1,12));
                }
            monthArray.push(month);          
            day = randomDayInMonth(i,month); 
            studyArray[k][month] = day;
        }
    }
    return studyArray;
}