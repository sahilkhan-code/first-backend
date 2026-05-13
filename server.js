const express = require('express');

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    console.log('Middleware executed')
    next();
})

app.get('/',(req,res)=>{
    res.send('hello from first server');
})

app.get('/about',(req,res)=>{
    res.send('Learning backend');
});

app.get('/user',(req,res)=>{
    res.json({name:'sahil',role:'Developer'});
})

app.post('/login',(req,res)=>{
    console.log('body data',req.body)

    res.json({
        message:'Login successful',
        data:req.body
    });
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');  
})