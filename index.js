const express =require("express");
const app=express();
const port=3000;
const path=require("path");
const Chat=require("./models/chat.js")
const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
//connecing server
const mongoose=require("mongoose");
const exp = require("constants");

main()
.then(()=>{
    console.log("connection successfull");
})
.catch((err)=>{console.log(err)});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1=new Chat({
//     from:"Bhushan",
//     to:"Nisarg",
//     message:"how r u brother",
//     created_at:new Date(),
// });

// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

//checkimg server is workong or not 
app.get("/",(req,res)=>{
    res.send("Hi! server working properly");
});

// showing all chats
app.get("/chats",async (req,res)=>{
 let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

//creating new chats
app.get("/chats/new", (req,res)=>{
       res.render("new.ejs");
   });

app.post("/chats",(req,res)=>{
let {from,message,to}=req.body;
let chat= new Chat({
    from:from,
    message:message,
    to:to,
    created_at:new Date,
});
chat.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

res.redirect("/chats");
});

//editing and updating chats 

app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {message:newMessage}=req.body;
    let updateChat=await Chat.findByIdAndUpdate(id,{message:newMessage},{runValidators:true,new:true});
    console.log(updateChat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteChat=await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})

app.listen(port, () => {
    console.log("server listening on port: ", port);
});
