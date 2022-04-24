const Car = require("../models/Car");

const {carViewModel} = require('./util')

async function getAll(query) {
    const options = {}
    if(query.search){
        options.name = new RegExp(query.search,  'i')
    }
    if (query.from) {
        options.price = {$gte: Number(query.from)}
    }
    if(query.to) {
        if(!options.price) {
            options.price = {}
        }
        options.price.$lte = Number(query.to)
    }

    const cars = await Car.find(options)
    return cars.map(carViewModel)
    // const data = await read()
    // let cars =  Object.entries(data).map(([id, v]) => Object.assign({}, {id}, v))
    //
    // if(query.search){
    //     cars = cars.filter(el => el.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()))
    // }
    // if (query.from) {
    //     cars = cars.filter(el => el.price >= query.from)
    // }
    // if(query.to) {
    //     cars = cars.filter(el => el.price <= query.to)
    // }
    //
    //
    // return cars
}

async function getById(id) {
    const car = await Car.findById(id).populate('accessories')
    if (car) {
        return carViewModel(car)
    } else {
        return undefined
    }
    // const data = await read()
    // const car = data[id]
    // if (car) {
    //     return Object.assign({}, {id}, car)
    // } else {
    //     console.error('404')
    // }
}


async function createCar(car) {
    const result = new Car(car)
    await result.save();


    // const cars = await read()
    //
    // let id
    //
    // do {
    //     id = nextId()
    // } while (cars.hasOwnProperty(id))
    //
    // cars[id] = car
    //
    // await write(cars)
}


async function deleteById(id, ownerId) {
    const existing = await Car.findById(id)
    if (existing.owner != ownerId){
        return false
    }
    await Car.findByIdAndDelete(id)
    return true
    // const data = await read()
    //
    // if (data.hasOwnProperty(id)) {
    //     delete data[id]
    //     await write(data)
    // } else {
    //     throw new ReferenceError("No such ID")
    // }
}

async function updateById(id, car, ownerId) {
    const existing = await Car.findById(id)
    if (existing.owner != ownerId){
        return false
    }
    existing.name = car.name
    existing.description = car.description
    existing.imageUrl = car.imageUrl || undefined
    existing.price = car.price
    existing.accessories = car.accessories
    await existing.save()
    return true
}

async function attachAccessory(carId, accessoryId, ownerId) {
    const existing = await Car.findById(carId)

    if (existing.owner != ownerId){
        return false
    }

    existing.accessories.push(accessoryId)
    await existing.save()
    return true

}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    }
    next()
}
