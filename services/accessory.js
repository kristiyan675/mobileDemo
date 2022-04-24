const Accessory = require('../models/Accessory')
const {accessoryViewModel} = require('./util')


async function getAll() {
    const data = await Accessory.find({})
    // [].map()
    // return data.map((e) => {
    //     return accessoryViewModel(e)
    // })
    return data.map((e)=>{
        return accessoryViewModel(e)
    })

    // data.map(accessoryViewModel)
}


async function createAccessory(accessory) {

    await Accessory.create(accessory)

}


module.exports = () => (req, res, next) => {
    req.accessory = {
        createAccessory,
        getAll
    }
    next()
}
