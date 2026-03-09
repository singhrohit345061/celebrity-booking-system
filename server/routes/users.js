const express = require("express");
const router = express.Router();
const db = require("../db");


/* SIGNUP */

router.post("/signup",(req,res)=>{

const {name,email,password,role,price_per_hour} = req.body;

const sql = "INSERT INTO users(name,email,password,role,price_per_hour) VALUES(?,?,?,?,?)";

db.query(sql,[name,email,password,role,price_per_hour],(err,result)=>{

if(err){
res.send(err);
}else{
res.send("User created successfully");
}

});

});


/* LOGIN */

router.post("/login",(req,res)=>{

const {email,password} = req.body;

const sql = "SELECT * FROM users WHERE email=? AND password=?";

db.query(sql,[email,password],(err,result)=>{

if(err){
res.send(err);
return;
}

if(result.length>0){

res.json({
message:"Login successful",
role:result[0].role,
user:result[0]
});

}else{

res.json({
message:"Invalid email or password"
});

}

});

});


/* GET ALL INFLUENCERS */

router.get("/influencers",(req,res)=>{

const sql="SELECT id,name,email,price_per_hour FROM users WHERE role='influencer'";

db.query(sql,(err,result)=>{

if(err){
res.send(err);
}else{
res.json(result);
}

});

});


/* DELETE ACCOUNT */

router.delete("/delete-user/:id",(req,res)=>{

const id=req.params.id;

const sql="DELETE FROM users WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err){
res.send(err);
}else{
res.send("Account deleted");
}

});

});


module.exports = router;