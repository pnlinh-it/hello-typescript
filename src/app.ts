import express, {Application, Request, Response, NextFunction} from 'express'

const app: Application = express()

const port = 5000

app.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.send('Hello')
})

app.listen(port, () => {
    console.log(`App is running at ${port}`)
})
