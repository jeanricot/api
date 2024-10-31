import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/usuarios/', async(req,res) =>{
    await prisma.user.create({
      data: {
               name: req.body.name,
               email: req.body.email,
               age:   req.body.age
      }
    })
      res.status(201).json(req.body)
  })
  app.get('/usuarios' , async(req,res) =>{
    const users = await prisma.user.findMany()
   
     res.status(200).json(users)
    })

    app.put('/usuarios/:id',async (req, res) => {
        await prisma.user.update({
          where: {
           id: req.params.id
          },
          data: {
           name: req.body.name,
           email: req.body.email,
            age:   req.body.age
          }
   
        })
        res.status(201).json(req.body)
   })

 app.delete('/usuarios/:id' ,async (req, res) => {
    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    })
         res.status(201).json('usuario deletado com sucesso!.....')
   })

        app.listen(3000)
