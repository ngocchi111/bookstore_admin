const bookModel = require('../models/bookModel');

exports.index = async (req, res, next) => {
    // Get books from model
    const books =  await bookModel.list(req.params.status);
    res.render('books/list', {books});
};

exports.insert = async (req, res, next) => {
    res.render('books/detailInsert');
};

exports.details = async (req, res, next) => {
    res.render('books/detailUpdate', await bookModel.get(req.params.id));
}

exports.postUpdata= async (req, res) => {
    const id= req.body.id;
    const obj={$set: {title: req.body.title, cover: req.body.cover, author: req.body.author,basePrice: parseInt(req.body.basePrice), detail: req.body.detail, status: parseInt(req.body.status)}};
    bookModel.updata(id,obj);
    res.render('books/detailUpdate', await bookModel.get(req.params.id));
};

exports.postUpdata1= async (req, res) => {
    var book = await bookModel.get(req.body.deleteButton);
    const status= book.status;
    book.status= parseInt(1-parseInt(book.status));
    const id= book._id;
    const obj ={$set: {title: book.title, cover: book.cover, author: book.author,basePrice: parseInt(book.basePrice), detail: book.detail, status: parseInt(book.status)}};
    bookModel.updata(id,obj);
    const books =  await bookModel.list(status);
    res.render('books/list', {books});
};

exports.postInsert= async (req, res) => {
    const obj={title: req.body.title, cover: req.body.cover, author: req.body.author, basePrice: parseInt(req.body.basePrice), detail: req.body.detail, status: parseInt(req.body.status)};
    bookModel.insert(obj);
    res.render('books/detailInsert');
};