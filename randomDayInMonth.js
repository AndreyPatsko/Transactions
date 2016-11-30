function randomDayInMonth(year,month) {
    var day31Monthes = [1,3,5,7,8,10,12];
    var day30Monthes = [4,6,9,11];
            if (day31Monthes.indexOf(month) !== -1){
                day = Math.round(randomMinMax(1,31));
            }else if ( day30Monthes.indexOf(month) !== -1){
                day = Math.round(randomMinMax(1,30));
            }else if ((month == 2)&&(year%4 ==0)){
                day = Math.round(randomMinMax(1,29));
            }else {
                day = Math.round(randomMinMax(1,28));
            }
        return day;
}