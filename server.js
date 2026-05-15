const express = require('express');
const userRoutes = require('./src/routes/userRoutes')
const loginRoutes = require('./src/routes/loginRoutes')
const registerUserRoute = require('./src/routes/registerUserRoute')
const postRoutes = require('./src/routes/postRoutes')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', loginRoutes)
app.use('/register',registerUserRoute)
app.use('/posts',postRoutes)

app.use((req, res, next) => {
    console.log('Middleware executed')
    next();
})

app.use((req, res, next) => {
    console.log('Request received');
    next();
});


app.get('/', (req, res) => {
    res.send('hello from first server');
})

app.get('/about', (req, res) => {
    res.send('Learning backend');
});

app.get('/user', (req, res) => {
    res.json({ name: 'sahil', role: 'Developer' });
})

app.get('/users/:id', (req, res) => {
    console.log('req.params', req.params);

    res.json({
        userId: req.params.id
    })
})

app.get('/products',(req,res)=>{
    console.log('req.query', req.query);
    res.json({
        query:req.query
    })
})

// app.post('/login', (req, res) => {
//     console.log('body data', req.body)

//     res.json({
//         message: 'Login successful',
//         data: req.body
//     });
// })

app.post('/register', (req, res) => {
    console.log('body data', req.body)

    res.json({
        success: true,
        user: req.body
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})