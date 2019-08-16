const express=require('express');
const app=express();
const fs=require('fs');

var counter = 0;

app.get('/',(req,res)=>{
    fs.readFile('./counterMain.html',(err,data)=>{
        if (err) throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.post('/increase',(req,res)=>{
    console.log('Post /increase');
    counter +=1;
    res.redirect('/'); 
});

app.post('/decrease',(req,res)=>{
    console.log('Post /decrease');
    counter-=1;
    res.redirect('/');
})

app.get('/show',(req,res)=>{
    console.log('Get /show');
    var a =String(counter);
    res.send(a);
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000.');
});