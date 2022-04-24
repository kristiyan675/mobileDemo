module.exports = {
    async get(req, res){
        const id = req.params.id
        try {
            const [car, accessories] = await  Promise.all([
                req.storage.getById(id),
                req.accessory.getAll()
            ])

            if (car.owner != req.session.user.id ){
                console.log('User is not owner')
                return res.redirect('/login')

            }

            let existing = car.accessories
            existing = existing.map(e => e.id.toString())
            const availableAccessories = accessories.filter(a => existing.includes(a.id.toString()) === false)

            res.render('attach', {car, accessories: availableAccessories})

        }catch (e) {
            console.log(e)
            console.log(e.message)
            res.render('404')
        }
    },
    async post(req, res){
        const carId = req.params.id
        const accessoryId = req.body.accessory
        try {
            if(await req.storage.attachAccessory(carId, accessoryId, req.session.user.id)){
                res.redirect('/')
            }
            else {
                res.redirect('/login')
            }
        }
        catch (e){
            console.log('Attach failed')
            console.log(e.message)
            res.redirect('/attach/' + carId)
        }

    }

}