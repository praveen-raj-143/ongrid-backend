const {User} = require("../Models/usermodel")
const {Demo} = require("../Models/demomodel")
const {Query} = require("../Models/querymodel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "mysecretkey"


const signup = async (req,res)=>{
    const {username,age,companyname,employeeid,email,password} = req.body;
    
    
    try{
        const olduser = await User.findOne({email});
        if(olduser){
          return  res.send("user already exists");
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        
        const userobj = new User({
            username,
            age,
            companyname,
            employeeid,
            email,
            password: hashpassword
        })
        
         await userobj.save();

        return res.json({status:"ok"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send("invalid details")
    }
}

const login = async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({status:"error"})
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if(checkpassword){
        const token = jwt.sign({email: user.email},JWT_SECRET, {
            expiresIn:'1d',
        })
        
        return res.json({status:"ok", data:token})
    }else{
        return res.json({status:"error"})
    }
    
}


const bookdemo = async (req,res)=>{
    const {name,email,phonenumber,organisation,aboutongrid} = req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.json({status:"error"})
    }
    try{
        const bookdemoobj = new Demo({
            name,
            email,
            phonenumber,
            organisation, 
            aboutongrid
        })
        await bookdemoobj.save();
        
        return res.json({status:"ok"})
    }
    catch(err){
        console.log(err)
        return res.json({status:"error"})
    }
}

const userdetails= async (req,res)=>{
    const {token}=req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err,res)=>{
            if(err){
                return "token expired";
            }
            return res;
        });
        if(user=="token expires"){
            return res.json({status: "error", data:"token expired"})
        }
        const useremail = user.email;
        User.findOne({email: useremail})
        .then((data)=>{
            res.send({status: "ok", data: data});
        })
        .catch((error)=>{
            res.send(error);
        })
    } catch (error) {
        
    }
}

const query = async (req,res)=>{
    const {name,email,phonenumber,query} = req.body;
    try{        
        const queryobj = new Query({
            name,
            email,
            phonenumber,
            query
        })
        
         await queryobj.save();

        return res.json({status:"ok"})
    }
    catch(err){
        console.log(err)
        return res.json({status:"error"})
    }
}
module.exports = {signup,login,bookdemo,userdetails,query};