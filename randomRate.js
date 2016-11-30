function randomRate(rate,period) {
    var max = 0;
    var array = [];
    switch (period) {
        case "Week":
            max = 7;
            break;
        case "Month" :
            max = 30;
            break;
        case "Year" :
            max = 365;
            break;
    }
     function arrayOfRates(max) {    
        while (array.length < rate) {
            var random = Math.round(1 + Math.random()*(max - 1));
            if (array.indexOf(random) == -1) {
                array.push(random);
            }
        }
        return array;
    }
    arrayOfRates(max);
    return array;
}