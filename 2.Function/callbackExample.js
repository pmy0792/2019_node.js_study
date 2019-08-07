const list=[1,2,3,4,5,6,7,8,9,10];

const callbackExample=(items,callback)=>{
        const sum = items.reduce((a,b)=>(a+b));
        callback(sum);
    };
        
const func=result=>console.log(result);
callbackExample(list,func);
//기존에 setTimeout함수는 왜있던거죠??ㅠㅠ