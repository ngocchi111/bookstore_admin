
const {db} = require('../dal/db');
const { ObjectId, Int32} = require('mongodb');

exports.list = async (filter, pageNumber, itemPerPage) => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find(filter).limit(itemPerPage).skip(itemPerPage*(pageNumber-1)).toArray();
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectId(id)});
    return book;
}

exports.count= async (filter) =>{
    const booksCollection = db().collection('books');
    const count = await booksCollection.count(filter);
    return count;
}

exports.updata=async(id,obj)=>{
    const booksCollection = db().collection('books');
    const old ={_id :ObjectId(id)};
    //obj.status=parseInt(obj.status);
    //obj.basePrice=parseInt(obj.basePrice);
    await booksCollection.updateOne(old,obj);
    return booksCollection;
}

exports.insert=async(obj)=>{
    const booksCollection = db().collection('books');
    await booksCollection.insertOne(obj);
    return booksCollection;
}
