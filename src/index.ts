import express = require('express')
import { MetricsHandler } from './metrics'
import bodyparser= require('body-parser')
import morgan = require('morgan')

import { UserHandler, User } from './user'
import session = require('express-session')
import levelSession = require('level-session-store')
import path = require('path')
const dbUser: UserHandler = new UserHandler('./db/users')

const LevelStore = levelSession(session)
const app = express()
const dbMet : MetricsHandler = new MetricsHandler('./db/metrics')

const port: string = process.env.PORT || '8080'

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(morgan('dev'))

app.use(session({
  secret: 'my very secret phrase',
  store: new LevelStore('./db/sessions'),
  resave: true,
  saveUninitialized: true
}))

app.set('views', __dirname + '/../views')
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, '/../node_modules/jquery/dist')))
app.use('/', express.static(path.join(__dirname, '/../node_modules/bootstrap/dist')))

app.get('/', (req: any, res: any) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('Write in the url "/hello/YourName" , the app will welcome you. Little bonus if you find my name, you will have a short intro of myself')
})

const authRouter = express.Router()

authRouter.get('/login', (req: any, res: any) => {
  res.render('login')
})

authRouter.get('/logout', (req: any, res: any) => {
  if (req.session.loggedIn) {
    delete req.session.loggedIn
    delete req.session.user
  }
  res.redirect('/login')
})

authRouter.get('/signup', function (req: any, res: any) {
  res.render('signup')
})

authRouter.post('/login', (req: any, res: any, next: any) => {
  dbUser.get(req.body.username, (err: Error | null, result?: User) => {
    if (err) next(err)
    if (result === undefined || !result.validatePassword(req.body.username)) {
      res.render('login', {message : "Wrong username or paswword !"})
    } else {
      req.session.loggedIn = true
      req.session.user = result
      res.redirect('/')
    }
  })
})

authRouter.post('/signup', (req: any, res: any, next: any) => {
  console.log('test')
  dbUser.save(req.body, (err: Error | null) =>{
    if (err) throw err
    res.render('signup', {message : "User created"})
  })
})

app.use(authRouter)
const userRouter = express.Router()

  userRouter.post('/', (req: any, res: any, next: any) => {
    const { username, password, email } = req.body
    const u = new User(username, password, email)
    dbUser.save(u, (err: Error | null) => {
      if (err) next(err)
      res.satus(200).send("user saved")
    })
  })

  userRouter.get('/', (req: any, res: any, next: any) => {
    dbUser.get(req.body.username, (err: Error | null, result?: User) => {
      if (err) next(err)
      if (result === undefined || !result.validatePassword(req.body.username)) {
        res.status(404).send("user not found")
      } else {
        res.status(200).json(result)
      }
    })
  })

  app.use('/user', userRouter)

const authCheck = function (req: any, res: any, next: any) {
  if (req.session.loggedIn) {
    next()
  } else res.redirect('/login')
}

app.get('/', authCheck, (req: any, res: any) => {
  res.render('index', { name: req.session.username })
})

const mectricsRouter = express.Router()

/*app.get('/metrics/:id', (req: any, res: any) => {
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

app.delete('/metrics/:id', (req: any, res: any, next: any) => {
  dbMet.remove(req.params.id, (err: Error | null) => {
    if (err) next(err)
    res.status(200).send()
  })
})*/

mectricsRouter.get('/:id', (req: any, res: any) => {
     dbMet.get(req.params.id, (err: Error | null, result?: any) =>{
       if(err) throw err
       if(result===undefined) {
         res.write('no result')
         res.send
       }
       else res.json(result)
       })
   })

mectricsRouter.post('/metrics/:id', (req: any, res: any, next:any) => {
     dbMet.save(req.params.id, req.body, (err: Error | null, result?:any) =>{
       if(err){
         res.status(500).send(err.message)
       }
       res.status(200).send()
       })
   })

mectricsRouter.delete('/:id', (req: any, res: any, next: any) => {
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
