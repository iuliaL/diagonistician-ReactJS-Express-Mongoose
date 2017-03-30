
db.questions.remove({"createdAt": {"$gte": new Date(2017, 2, 14), "$lt": new Date(2017, 2, 29)}})