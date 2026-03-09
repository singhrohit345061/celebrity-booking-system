const express = require("express");
const router = express.Router();
const db = require("../db");


/* SEND BOOKING REQUEST */

router.post("/booking-request",(req,res)=>{

const {customer_id,influencer_id,event_date,start_time,end_time} = req.body;

const sql = `
INSERT INTO bookings
(customer_id,influencer_id,event_date,start_time,end_time,status)
VALUES(?,?,?,?,?,'pending')
`;

db.query(sql,[customer_id,influencer_id,event_date,start_time,end_time],(err,result)=>{

if(err){
res.send(err);
}else{
res.send("Booking request sent");
}

});

});


/* VIEW BOOKING REQUESTS FOR INFLUENCER */

router.get("/requests/:influencer_id",(req,res)=>{

const influencer_id = req.params.influencer_id;

const sql = `
SELECT * FROM bookings
WHERE influencer_id=? AND status='pending'
`;

db.query(sql,[influencer_id],(err,result)=>{

if(err){
res.send(err);
}else{
res.json(result);
}

});

});


/* ACCEPT OR REJECT BOOKING */

router.put("/update-status",(req,res)=>{

const {booking_id,status} = req.body;

const sql = "UPDATE bookings SET status=? WHERE id=?";

db.query(sql,[status,booking_id],(err,result)=>{

if(err){
res.send(err);
}else{
res.send("Booking status updated");
}

});

});


/* CANCEL BOOKING */

router.put("/cancel-booking",(req,res)=>{

const {booking_id} = req.body;

const sql = "UPDATE bookings SET status='cancelled' WHERE id=?";

db.query(sql,[booking_id],(err,result)=>{

if(err){
res.send(err);
}else{
res.send("Booking cancelled");
}

});

});


module.exports = router;