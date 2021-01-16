const {db} = require('../dal/db');
const { ObjectId, Int32} = require('mongodb');
const bcrypt = require('bcrypt');
const { history } = require('../controllers/userController');

exports.user = async (Username) =>
{
    const userCollection = db().collection('admin');
    const user = await userCollection.findOne({username: Username});
    return user;
}

exports.add = async (newUser) =>
{
    const userCollection = db().collection('admin');
    const saltRounds = 10;
    await bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(newUser.password, salt , function (err, hash) {
        const user = {
            username: newUser.username,
            password: hash,
            email: newUser.email,
            status: 'active',
            blance: 0,
        }
        userCollection.insertOne(user);
        });
    })
    return userCollection;
}

exports.checkSignin=async (Username, Password)=>
{
    const userCollection = db().collection('admin');
    const user = await userCollection.findOne({username: Username});
    if (!user)
        return false;
    let checkPassword= await bcrypt.compare(Password, user.password);
    if (checkPassword)
    {
        console.log('username: ',user.username);
        return user;
    }
    return false;
}

exports.updata=async(id,obj)=>{
    const adminsCollection = db().collection('admin');
    const old ={_id :ObjectId(id)};
    await adminsCollection.updateOne(old,obj);
    return true;
}

exports.getUser= (id) =>{
    const userCollection = db().collection('admin');
    return userCollection.findOne({_id: ObjectId(id)});
}




exports.users = async (filter, pageNumber, itemPerPage) =>
{
    const userCollection = db().collection('users');
    const users = await userCollection.find(filter).limit(itemPerPage).skip(itemPerPage*(pageNumber-1)).toArray();
    return users;
}


exports.findUser = async (id) =>
{
    const userCollection = db().collection('users');
    const user = await userCollection.findOne({_id: ObjectId(id)});
    return user;
}

exports.count = async(filter)=>
{
    const usersCollection = db().collection('users');
    const count = await usersCollection.count(filter);
    return count;
}

exports.updataUser=async(id,obj)=>{
    const usersCollection = db().collection('user');
    const old ={_id :ObjectId(id)};
    await usersCollection.updateOne(old,obj);
    return usersCollection;
}