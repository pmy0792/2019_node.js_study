const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const users = [];
app.use(express.static(__dirname+'/'));
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{
    res.redirect('/signup.html')
});

app.post('/signup',(req,res)=>{
    const userId =req.body.userId;
    const password =req.body.password;

    const idx_id=users.findIndex((item,idx)=>{
        return item.Id ===userId});


        if (idx_id>-1){
            res.send('User already exists');    
        }
        else {users.push({Id:userId,PW:password});
        console.log(users);
        res.redirect('/login.html');
}});

app.post('/login',(req,res)=>{
    const userId =req.body.userId;
    const password =req.body.password;

    const idx_id=users.findIndex((item,idx)=>{
        return item.Id ===userId});
    const idx_pw=users.findIndex((item,idx)=>{
        return item.PW ===password});
        
        if (idx_id<0){
            res.send('Id Wrong');    
        }
        if((idx_id>-1)&&idx_pw==-1){
            res.send('Password Wrong')
        }
        if (((idx_id>-1)&&(idx_pw>-1))){
            res.send("Welcome "+userId+"!")};
})
    


app.listen(3000,()=>{
    console.log('server is running on port 3000');
});