
module.exports = {
    async get(req, res){
        const id = req.params.id
        let car = await req.storage.getById(id)
        console.log(car.owner, req.session.user.id)
        if (car.owner != req.session.user.id ){
            console.log('User is not owner')
            return res.redirect('/login')

        }
        res.render('edit', {car})
    },
    async post(req, res){
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price)

        }

        const id = req.params.id
        try {
            if(await req.storage.updateById(id, car, req.session.user.id)){
                res.redirect('/')
            }
            else {
                res.redirect('/login')
            }
        }
        catch (e){
            console.log(e.message)
            throw new Error("Failed to update")
        }

    }

}