// Each .then() returns a newly generated promise object


const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('result promise 1')
    }, 5000)
});

const promise2 = new Promise<string>(function (resolve, reject) {
    setTimeout(function () {
        resolve('result promise 2')
    }, 5000)
});

async function awaitPromise() {
    // Exception wil throw at here
    return await promise
}

async function justPromise() {
    // Exception wil throw at .then()
    return promise
}

awaitPromise().then(function () {
    console.log('hi')
})

justPromise().then(function () {

})


// const a1111 = promise
//     .then(function (value) {
//         console.log('done')
//         console.log(value)
//         return 'awdawd'
//     })
//     .then(function (value) {
//         console.log(value)
//         return 1
//     }, function (reject) {
//         reject('')
//     })
//     .then(function (value) {
//
//     })
//
//     .catch(function () {
//
//         return 'error'
//     })


const a1111 = promise
    .then(function (value) {
        console.log(value)
        return 'awdawd'
    })
    .then(function (value) {
        console.log(value)
        return promise2
    })
    .then(function (value) {
        console.log(value)
    })
    .then(function (value) {
        // return a void promise
        promise2.then(function () {
            // return here take no effect because we don't return this promise
            return 'okokokok'
        }).catch(function () {
            return 'errorrrrrr'
        })
    })
    .then(function (value) {
        // return a string promise
        return promise2.then(function () {
            return 'okokokok'
        }).catch(function () {
            return 'errorrrrrr'
        })
    })
    // return a void promise
    .then(function (value) {
        // We return a promise but we don't return a value inside then, because each .then() also return a promise
        return promise2.then(function () {
            console.log('okokokok')
        }).catch(function () {
            console.log('errorrrrrr')
        })
    })
    // return promise with timeout
    .then(function (value) {
        return promise2.then(function () {
            return new Promise<string>(function (resolve, reject) {
                setTimeout(function () {
                    resolve('awdawdwd')
                }, 1000)
            })
        }).catch(function () {
            return ''
        })
    })
    .then(function (value) {
        // okokokok or errorrrrrr
        console.log(value)
    })
    .catch(function () {
        return 'error'
    })

// console.log(a1111)
//
// a1111.then(function (value) {
//     console.log(value)
// })


console.log('dddd')

const a11111111 = (user:number) => "awdawdadad"

new Promise(function (){
    console.log('execute')
})

function getPromise(){
    return new Promise(function (){
        console.log('execute')
    })
}


