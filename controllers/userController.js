const { render } = require('../app');
const userModel = require('../models/userModel');

exports.home=(req, res, next)=>
{
    if (!req.user)
        res.redirect('/signin');
    else
        res.render('index')
}

exports.signin=(req,res,next) =>
{
    res.render('admin/signin');
}

exports.infor= async (req,res,next) =>
{
    if (req.user)
    {
        const username = req.user.username;
        res.render('admin/infor', await userModel.user(username));
    }
    else 
        res.redirect('/signin');
}

exports.postInfor =async (req, res, next) =>
{
    const id = req.user._id;
    const obj={$set: {name: req.body.name, address: req.body.address, birthday: req.body.birthday}};
    await userModel.updata(id,obj);
    res.redirect('/signin');
}

exports.users = async (req, res, next) =>
{
    if (req.user)
    {
        const pageNumber = +req.query.page || 1;
        const itemPerPage = +req.query.item || 15;
        const usersTotal = await userModel.count();
        const users=await userModel.users({},pageNumber, itemPerPage);
        res.render('users/list', {users,
        hasNextPage: itemPerPage*pageNumber < usersTotal,
        hasPrevPage: pageNumber > 1,
        hasPage: (itemPerPage*pageNumber < usersTotal) || pageNumber > 1,
        nextPage: pageNumber+1,
        prevPage: pageNumber-1,
        lastPage: Math.floor((usersTotal+itemPerPage)/itemPerPage),
        itemPerPage,
        pageNumber,
        });
    }
    else 
        res.redirect('/signin');
}

exports.user = async (req, res, next) =>
{
    if (req.user)
    {
        res.render('users/detail', await userModel.findUser(req.params.id));
    }
    else 
    res.redirect('/signin');
}

exports.updateUser = async (req, res, next) =>
{
    const id = req.user._id;
    const obj={$set: {name: req.body.name, address: req.body.address, birthday: req.body.birthday, status: req.body.status}};
    await userModel.updataUser(id,obj);
    res.redirect('/users/infor');
}