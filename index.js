const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json()); //bodyparser


app.get("/" , function(req,res){
    fs.readFile("todo.json" , "utf-8" , function(err , data){
        const todo = JSON.parse(data);    //data returns in string format , need to convert in json to be able to use.
        let todos=[];
        for(let i=0 ; i<todo.length ; i++){
            todos.push(todo[i].id+". "+todo[i].description);
        }
        res.json(todos);
        // console.log(todo[0].description);
    });
    
});
const requiredTodo = require("./todo.json");

app.post("/",function(req,res){
    let booby = req.body.description;
    // const todos = require("./todo.json"); //reading the file to get id for new task

    const newTodo = {                       //new object of todo to be inserted
        "id" : (requiredTodo.length+1).toString(),
        "description":booby
    };
    requiredTodo.push(newTodo);
    fs.writeFile("todo.json", JSON.stringify(requiredTodo), err => {           //writing in the file
        if(err){
            throw err;
        }else{
            res.json({
                msg : "posting completed"
            });
        }
    });

});

app.delete("/" , function(req,res){
    let di = req.body.id;
    
    requiredTodo.splice(di-1 , 1);
    for(let i=0 ; i<requiredTodo.length ; i++){
        requiredTodo[i].id = (i+1).toString();
    }
    fs.writeFile("todo.json", JSON.stringify(requiredTodo), err => {           //necessary to write in the data base after deletings
        if(err) throw err;
        else{
            res.json({
                msg : "deleted"
            });
        }
    });

});

app.put("/" , function(req,res){
    let di = req.body.id;
    let des = req.body.description;

    for(let i=0 ; i<requiredTodo.length ; i++){
        if(requiredTodo[i].id == di){
            requiredTodo[i].description = des ;
            break;
        }
    }

    fs.writeFile("todo.json" , JSON.stringify(requiredTodo),err => {
        if(err) throw err;
        else{
            res.json({
                msg : "updated"
            });
        }
    }
    );
});

app.listen(3000);



