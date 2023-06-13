const {User} = require("../Models/usermodel")
const {Demo} = require("../Models/demomodel")
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
        
        const insert = await userobj.save();

        return res.status(200).send(insert)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}

const login = async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.send("invalid username ")
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if(checkpassword){
        const token = jwt.sign({},JWT_SECRET)
        
        return res.json({status:"ok", data:token})
    }else{
        return res.send("invalid password ")
    }
    
}


const bookdemo = async (req,res)=>{
    const {name,email,phonenumber,organisation,aboutongrid} = req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.json("This email is not registered. if you not signup to OnGrid you can't book a demo please signup")
    }
    try{
        const bookdemoobj = new Demo({
            name,
            email,
            phonenumber,
            organisation,
            aboutongrid
        })
        const bookinsert = await bookdemoobj.save();
        
        return res.status(200).json("demo booked").send(bookinsert)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}

module.exports = {signup,login,bookdemo};