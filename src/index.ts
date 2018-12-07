import express = require('express')
import { MetricsHandler } from './metrics'
import bodyparser= require('body-parser')

const app = express()
const dbMet : MetricsHandler = new MetricsHandler('./db/metrics')

const port: string = process.env.PORT || '8080'

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.get('/', (req: any, res: any) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('Write in the url "/hello/YourName" , the app will welcome you. Little bonus if you find my name, you will have a short intro of myself')
})


app.get('/metrics/:id', (req: any, res: any) => {
     dbMet.get(req.params.id, (err: Error | null, result?: any) =>{
       if(err) throw err
       if(result===undefined) {
         res.write('no result')
         res.send
       }
       else res.json(result)
       })
   })

app.post('/metrics/:id', (req: any, res: any, next:any) => {
     dbMet.save(req.params.id, req.body, (err: Error | null, result?:any) =>{
       if(err){
         res.status(500).send(err.message)
       }
       res.status(200).send()
       })
   })

app.delete('/metrics:id', (req: any, res: any, next: any) => {
  dbMet.remove(req.params.id, (err: Error | null) => {
    if (err) next(err)
    res.status(200).send()
  })
})

app.get('/hello/:name', (req: any, res: any) =>{
    res.setHeader('Content-Type', 'text/plain')
    if(req.params.name === 'benoit') res.send('Hello I am Benoit, I am french and live in Paris. I am in my final year in an engineering school')
    else res.send('Hello ' + req.params.name)
})

app.use((req: any, res: any) =>{
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send('Error 404. Message not found.')
})

//app.listen(8080)
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
