const Signup=require("../models/SignupModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//LOGIN
const login=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
  
    if(!email || !password)
        {
            res.status(300).json("No email or password");
        }

    try 
    {
        const User=await Signup.findOne({email});

        if(!User)
            {
                res.status(404).json("Do not Exist");
            }
        else
            {
                if(await bcrypt.compare(password,User.password))
                    {
                        const accessToken=jwt.sign({
                        user: 
                            {
                                username : User.name,
                                id:User.id,
                                email : User.email,
                            }
                        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1hr"})
                        res.status(200).json({accessToken});
                    }
                else
                    {
                        res.status(400).json("wrong password");
                    }
            }
    } 
    catch (error) 
        {
            res.json("error");
        }
};


const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    const hashedPassoword=await bcrypt.hash(password,10);
    console.log(hashedPassoword);
    if(!name || !email || !password )
    {
        res.status(404).json("All fields are mandatory");
    }
    try 
    {
        const existingUser=await Signup.findOne({email});
        if(existingUser)
            {
                console.log("User already exists");
                res.status(400).json("User already exist");
            
            }
        else
            {
                console.log("creating user");
                const user=await Signup.create({
                    name,
                    email,
                    password:hashedPassoword,
                   });
               console.log("user created");
               res.status(200).json("user has been created successfully");
            }
    } 
    catch (error) 
    {
        res.status(500).json(`An error occured while signup ${error}`);
    }
   
    }

module.exports={login,signup}