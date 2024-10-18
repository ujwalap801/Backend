// CREATE HTTPS Server

// approach-1
//  const {createServer}=require('http')
//  const server = createServer((req,res)=>
// {
//     res.end("This response is from server");
// })

//    //assign a port number to server
//      server.listen(3000,()=>
//     {
//         console.log("server is on port 3000...")
//     })



// approach-2
const express= require("express");
const app = express()

// assign port
app.listen(3000,()=>
{
    console.log("app is listening to port 3000")
})

// add body praser middleware
app.use(express.json());


// Create  USER REST API(routes)

  //test data(it will be replaced with DB later)

let  users=[
    {id:1,name:"kiran",age:21},
    {id:2,name:"ram",age:23},
    {id:3,name:"surya",age:11},
    {id:4,name:"vijay",age:26},
]

   //ROUTE FOR GET USER
   app.get("/users",(req,res)=>
   {  
    // send all users
    res.send({message:"all users",payload:users})

   })


   //ROUTER TO GET USER BY ID (URL params)    
   app.get("/users/:id",(req,res)=>
   {

        //req.params is an object 
        // get id from url (convert the string Id to number Id)
        const paraId = Number(req.params.id)    //{id:1}
        console.log(paraId);

        // search user with this paraId
        let result = users.find(user=>user.id === paraId);
        console.log(result);
        // if user not found
        if(result === undefined)
        {
            res.send({message:"user not found"})
        }
        else{
            res.send({message:"user",payload:result});
        }
        // send res


   })



    // ROUTE TO POST USER
   app.post("/user",(req,res)=>
   {
       // get user obj from req
       let newUser= req.body;
       console.log(newUser);

        // add newUser to users array
        users.push(newUser);

        // send
        res.send({message:"New user created"});

   })


   // ROUTE FOR PUT User
   app.put("/user",(req,res)=>
   {
        //get modified user from clinet
        let modifiedUser = req.body;

        // find and replace user
        let userIndex= users.findIndex(user=>user.id === modifiedUser.id);
        //  if user not found
        if(userIndex === -1)
        {
            res.send({message:"User not found to update"});
        }else{
            users.splice(userIndex,1,modifiedUser);
            res.send({message:"User modified"});
        }
   })


   //ROUTE DELETe USER
   app.delete("/users/:id",(req,res)=> 
   {
     // get id from url (convert the string Id to number Id)
     const paraId = Number(req.params.id)    //{id:1}
     console.log(paraId);

    //  find index os user matched with paraId
    let userIndex= users.findIndex(user=>user.id === paraId);
     if(userIndex === -1)
     {
        res.send({message:"User not found to delete"});
     }
     else{
        users.splice(userIndex,1);
        res.send({message:"User removed"});
     }
  })

