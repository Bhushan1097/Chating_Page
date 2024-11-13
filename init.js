const mongoose=require("mongoose");
let Chat=require("./models/chat.js")
main()
.then(()=>{
    console.log("connection successfull");
})
.catch((err)=>{console.log(err)});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats=[
    {
        from:"Rohan",
        to:"Saursbh",
        message:"I want some money",
        created_at:new Date(),
    },
    {
        from:"Sarita",
        to:"Bhushan",
        message:"how r u son",
        created_at:new Date(),
    },
    {
        from:"Papa",
        to:"Nisarg",
        message:"when r u comming home",
        created_at:new Date(),
    },

];

Chat.insertMany(allChats);