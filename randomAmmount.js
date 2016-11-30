function randomAmmount(min,max,currency) {
    var random = 0;
    random = min + Math.random()*(max - min);
    console.log(random);
    if((currency == "Byr")||(currency == "Usd")){
        return Math.round(random);
    }
    else if (currency == "Byn"){
        return +(random.toFixed(2));
    }
    else {
        console.log("Input right value.")
    }
}