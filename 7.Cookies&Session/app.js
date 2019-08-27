const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const session=require('express-session');
const fs=require('fs');

const users = [];
app.use(express.static(__dirname+'/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUnintialized:true
}));

app.get('/',(req,res)=>{
    fs.readFile('./signup.html',(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.post('/signup',(req,res)=>{
    const userId =req.body.userId;
    const password =req.body.password;
    const name=req.body.name;
    const department=req.body.department;
    const emailaddress=req.body.emailaddress;
    const phonenumber=req.body.phonenumber;
    const idx_id=users.findIndex((item,idx)=>{
        return item.Id ===userId});

        if (idx_id>-1){
            res.send('User already exists');    
        }
        else {users.push({Id:userId,PW:password,NAME:name,
            DEPARTMENT:department,EMAILADDRESS:emailaddress,
            PHONENUMBER:phonenumber});
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
    const find_info=users.find((item)=>item.Id===userId);
    

        if (idx_id==-1){
            res.send('Id Wrong');    
        }
        if((idx_id>-1)&&(find_info.PW!==password)){
            res.send('Password Wrong')
        }
        if ((idx_id>-1)&&(find_info.PW===password)){
            req.session.userId=userId;
            res.redirect('/profile')
        };
})
    
app.get('/profile',(req,res)=>{
    if(!req.session.userId){
        res.send('no session');
    }
    else{
        const ID =req.session.userId;
        const user_info=users.find((info)=>info.Id===ID);
        delete user_info.PW;

        res.send(user_info);
        console.log(user_info);
    }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});