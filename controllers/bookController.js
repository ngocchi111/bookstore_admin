const { ReplSet } = require('mongodb');
const bookModel = require('../models/bookModel');

exports.list = async (req, res, next) => {
    // Get books from model
    if (req.user)
    {
    const pageNumber = +req.query.page || 1;
    const itemPerPage = +req.query.item || 10;
    const Status =req.query.status;
    const filter={};
    filter.status =parseInt(Status);
    const q= req.query.q;
    const catalog = req.query.cat;
    var link ="";
    if (q)
    {
        filter.title= new RegExp(q, 'i');
        link=link+"&q="+q;
    }
    if (catalog)
    {
        filter.catalog=new RegExp(catalog, 'i');
        link=link+"&cat="+catalog;
    }
    const books =  await bookModel.list(filter, pageNumber, itemPerPage);
    const bookTotal = await bookModel.count(filter);
    var _status = false;
    if (req.query.status == 1)
        _status=true;
    res.render('books/list', {books, 
         _status,
         hasNextPage: itemPerPage*pageNumber < bookTotal,
         hasPrevPage: pageNumber > 1,
         hasPage: pageNumber<=bookTotal,
         nextPage: pageNumber+1,
         prevPage: pageNumber-1,
         lastPage: Math.floor(bookTotal/itemPerPage),
         itemPerPage,
         pageNumber,
         link,
    });
    }
    else 
        res.redirect('/');
}

exports.insert = async (req, res, next) => {
    if (req.user)
    res.render('books/detailInsert');
    else
        res.redirect('/');
};

exports.details = async (req, res, next) => {
    if (req.user)
    res.render('books/detailUpdate', await bookModel.get(req.params.id));
    else
        res.redirect('/');
}

exports.postUpdata= async (req, res) => {
    const id= req.body.id;
    const book= await bookModel.get(req.params.id);
    const obj={$set: {title: req.body.title, cover: req.body.cover, catalog: req.body.catalog, author: req.body.author,basePrice: parseInt(req.body.basePrice), detail: req.body.detail, status: parseInt(req.body.status)}};
    await bookModel.updata(id,obj);
    if (book.status== 1)
    res.redirect('/books?status=1');
    else
    res.redirect('/books?status=0');
};

exports.postUpdata1= async (req, res) => {
    var book = await bookModel.get(req.body.deleteButton);
    book.status= parseInt(1-parseInt(book.status));
    const id= book._id;
    const obj ={$set: {title: book.title, cover: book.cover, author: book.author, catalog: book.catalog, basePrice: parseInt(book.basePrice), detail: book.detail, status: parseInt(book.status)}};
    await bookModel.updata(id,obj);
    res.redirect('back');
};

exports.postInsert= async (req, res) => {
    const obj={title: req.body.title, cover: req.body.cover, author: req.body.author, catalog: req.body.catalog, basePrice: parseInt(req.body.basePrice), detail: req.body.detail, status: parseInt(req.body.status)};
    await bookModel.insert(obj);
    if (obj.status== 1)
    res.redirect('/books?status=1');
    else
    res.redirect('/books?status=0');
};