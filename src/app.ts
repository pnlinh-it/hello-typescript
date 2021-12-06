import express, {Application, Request, Response, NextFunction} from 'express'
import routes from './routes/routes';

const app: Application = express()

const router = express.Router()

const port = 4000

router.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('Time:', Date.now())
    next()
})

app.use('/users', routes)

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req: Request, res: Response, next: NextFunction) {
    console.log('Request URL:', req.originalUrl)
    next()
}, function (req: Request, res: Response, next: NextFunction) {
    console.log('Request Type:', req.method)
    next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req: Request, res: Response, next: NextFunction) {
    if (req.params.id === '0') {
        // if the user ID is 0, skip to the next router
        // pass to next route that handle '/user/:id'. In case has no handler -> return 404 error
        // Will log next, special
        next('route')
    }
    else {
        // Pass to next middleware: console.log('regular')
        // otherwise pass control to the next middleware function in this stack
        next()
    }
}, function (req: Request, res: Response, next: NextFunction) {
    // render a regular page
    console.log('regular')
    res.send('regular')
})

router.use('/user/:id', function (req: Request, res: Response, next: NextFunction) {
    console.log('next')
    next()
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req: Request, res: Response, next: NextFunction) {
    console.log(req.params.id)
    console.log('special')
    res.send('special')
})

// mount the router on the app
app.use('/', router)

app.use('/test', function (req: Request, res: Response){
    res.send('awd')
})


// app.get('/', async (request: Request, response: Response, next: NextFunction) => {
//     console.log("New request!")
//     // getUer is async function so it will suspend here.
//     // Looper will available to serve incoming request.
//     // Browser still waiting until response.send* is invoke
//     const user1 = await getUser()
//
//     const user2 = await getUser()
//
//     // Browser still waiting...
//     // After sleep and wake up, event will dispatch to Lopper.
//     // Looper continue to process the request
//     console.log("End get User")
//     response.sendStatus(200)
//     // Browser now receive the response.
// })

app.listen(port, () => {
    console.log(`App is running at ${port}`)
})

const sleep = async (milliseconds: number) => {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function getUser() {
    console.log('Start sleep')
    await sleep(5000)
    console.log('Wake up')
}

// https://stackoverflow.com/a/32269641/14284081
