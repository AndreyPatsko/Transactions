//function to update dates in rates cillection

function update(){
   var datesArray = db.getCollection('rates').find({}).toArray();
   var datesArrayNew = [];
   for(var i = 0; i < datesArray.length; i ++){
       var qwe = {};
       qwe.id = datesArray[i]["_id"];
       qwe.Date = new Date(Date.parse(datesArray[i].Date));
       qwe.Date.setUTCDate(qwe.Date.getUTCDate()+1);
       qwe.Date.setUTCHours(0);
       db.rates.updateOne({"_id":qwe.id},{$set:{"Date":qwe.Date}}) 
       
       datesArrayNew.push(qwe);
   }
   return datesArrayNew;
   //printjson(datesArrayNew);
}
update();