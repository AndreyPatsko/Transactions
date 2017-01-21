db.transactions.aggregate([{$match:{"FriendId":{$exists:true}}},
                            {$project:
                                {"_id":["$FriendId"],
                                    "debts":[{"Currency":"$Currency", "Total": "$Amount"}]}}
                                    
                                    ])
                                    
db.transactions.aggregate([{$match:{"FriendId":{$exists:true}}},
                            {$group:{_id:"$FriendId", debts:{$push: {"Currency":"$Currency", "Amount":"$Amount"}}}}
                                    
                                    ])




db.transactions.aggregate([{$match:{"FriendId":{$exists:true}}},
                            {$project:
                                {"_id":["$FriendId"],"Currency":"$Currency", "Amount": "$Amount"}},
                                    {$group:{_id:"$_id",debts:{$push:{"Currency":"$Currency", "Total":"$Amount"}}}}
                                    
                                    ])
                                     

