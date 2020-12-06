
const {db} = require('../dal/db');
const { ObjectId, Int32} = require('mongodb');

exports.list = async (Status) => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({status: Int32(Status)}).toArray();
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectId(id)});
    return book;
}

exports.updata=async(id,obj)=>{
    const booksCollection = db().collection('books');
    const old ={_id :ObjectId(id)};
    booksCollection.updateOne(old,obj);
    return booksCollection;
}

exports.insert=async(obj)=>{
    const booksCollection = db().collection('books');
    booksCollection.insertOne(obj);
    return booksCollection;
}
