var c = db.getCollection('rates').find({},{date:1,_id:0}).toArray();
var b = []
for(var i = 0;i < c.length; i++){
    b.push(c[i].date)
    }
    b