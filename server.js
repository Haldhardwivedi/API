const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const fs = require("fs");
const res = require('express/lib/response');

let my_data = []

let url1="https://jsonplaceholder.typicode.com/todos"; 
let url2="https://jsonplaceholder.typicode.com/users/"

let data,data1;

//first
axios.get(url1)
  .then(response => {
    data=response.data;
    //console.log(data[0].userId);
  })
  .catch(error => {
    console.log(error);
  });

//second api

axios.get(url2)
  .then(response => {
    data1=response.data;
    //console.log(data[0].userId);
  })
  .catch(error => {
    console.log(error);
  });


  
//handling the data recieved from api and making our own json file to sned 

app.get('/',(req,res)=>{
    res.end("Hey welcome to my Api");
});

app.get('/todos', (req, res) => {
    //console.log(data);
    data.forEach(element => {
            let newdata={
            id:element.id,
            title:element.title,
            completed:element.completed
        };
        my_data.push(newdata);
    });

    let newData2=JSON.stringify(my_data);
    // console.log(newData2);
    res.end(newData2);
});

app.get("/user/:id", (req, res) => {
    // console.log(typeof(req.params.id));
    let ans;
    data1.forEach(element => {
        if(element.id==Number(req.params.id))
        {
            ans=element;
            ans["todos"]=[];
        }
    });
    //now searching todos
    data.forEach(element => {
        if(element.userId==Number(req.params.id))
        {
            ans["todos"].push(element);
        }
    });
    if(ans)
    {
        let final_data=JSON.stringify(ans);
        res.end(final_data);
    }
    else
    res.end("Requested Id doesn't exist in our database")
});

//listening to the port

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });