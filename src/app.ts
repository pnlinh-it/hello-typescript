import express, {Application, Request, Response, NextFunction} from 'express'

const app: Application = express()

const port = 5000


app.get('/', async (request: Request, response: Response, next: NextFunction) => {
    console.log("New request!")
    // getUer is async function so it will suspend here.
    // Looper will available to serve incoming request.
    // Browser still waiting until response.send* is invoke
    const user1 = await getUser()

    const user2 = await getUser()

    // Browser still waiting...
    // After sleep and wake up, event will dispatch to Lopper.
    // Looper continue to process the request
    console.log("End get User")
    response.sendStatus(200)
    // Browser now receive the response.
})

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
