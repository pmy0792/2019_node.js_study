const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const session=require('express-session');

const users = [];
app.use(express.static(__dirname+'/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUnintialized:true
}));

app.get('/',(req,res)=>{
    res.redirect('/signup.html')
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
    const idx_name=users.findIndex((item,idx)=>{
        return item.name ===name});
    const idx_department=users.findIndex((item,idx)=>{
        return item.department===department});
    const idx_email=users.findIndex((item,idx)=>{
        return item.emailaddress=emailaddress});
    const idx_phone=users.findIndex((item,idx)=>{
        return item.phonenumber===phonenumber});

        if ((idx_id>-1)||(idx_department>-1)||(idx_email)>-1
        ||(idx_name>-1)||(idx_phone>-1)){
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
        
        if (idx_id<0){
            res.send('Id Wrong');    
        }
        if((idx_id>-1)&&idx_pw==-1){
            res.send('Password Wrong')
        }
        else{
            req.session.userId=userId;
            res.redirect('/profile')};
})
    
app.get('/profile',(req,res)=>{
    console.log('zz');
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});