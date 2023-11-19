const express = require('express')
const app =express()
const {PrismaClient} =require('@prisma/client')
const fileupload= require('express-fileupload')
const { create } = require('domain')
const path = require('path/posix')
const fs = require('fs');

const prisma = new PrismaClient()

app.use(express.json())
app.use(fileupload())

app.post('/register',async(req,res)=>{
    const info = req.body
   

    const something = req.files.abc
    console.log('abc:',something);
    const filepath =path.join(__dirname,'./upload/'+`${something.name}`) 
    console.log(filepath);

    something.mv(filepath)
    // console.log(info);
    // const register = await prisma.user.create({
    //     data:{info}
    // })
    res.json({ message: 'File uploaded successfully', file: filepath });
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate headers for file download
      res.setHeader('Content-disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-type', 'application/octet-stream');
  
      // Create a read stream from the file and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      console.log(fileStream);
    } else {
      res.status(404).send('File not found');
    }
  });



app.get('/', async (req,res)=>{
    const newuser = await prisma.user.findMany({
        where:{
            age:{gt:10}},
            include:{
                task:true
            }
    }) 
    
    console.log(newuser);
    res.json(newuser)
})
app.get('/:id', async (req,res)=>{
    const get =parseInt(req.params.id)
    // res.json(get)
    const newuser = await prisma.user.findMany({
        where: {id:get} }
    )
    console.log(newuser);
    res.json(newuser)
    
})
app.put('/update', async (req,res)=>{
    const info =parseInt(req.query.age)
    const updateUser = await prisma.user.updateMany({
        where:{age:27},
        data:{fname:'Sir',lname:'Tom'}
    })
    res.json(updateUser)
})

app.delete('/delete', async(req,res)=>{
    const delUser = await prisma.user.deleteMany({
        where:{age:parseInt(req.query.age)}
    })
    res.json(delUser)
})


app.post('/user_task', async (req,res)=>{
    console.log(req.body);
    const result =req.body
    const newuser = await prisma.user.create({
        data:{
            fname:'Mr',
            lname:'Manny',
            age:38,
            task:{
                create:{
                    tid:102,
                    title:'Wake Up!'
                    
                }
            }
         },
         include:{
            task:true
         }
    
    })
    console.log(newuser);
    res.json(newuser)
})

// Tasksssssssssssssssssss

app.post('/task',async (req,res)=>{
    const task = await prisma.task.create({
        data:{
            tid:102,
            title:"Eat and Sleep",
            task_id:1
        }
    })
    res.json(task)

})

app.put('/update_task', async (req,res)=>{
    
    const update_task = await prisma.task.update({
        where:{tid:109,
           task_id:6},
        data:
         { 
            title:'Eat and Sleep Code Repeat',
            // task_id:6
  }
        })
    res.send(update_task)
})

app.listen(3000,()=>{
    console.log("hi");
})
