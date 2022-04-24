module.exports = {
    get(req, res) {
        res.render('create', {title: 'Create Listing'})
    },
    async post(req, res) {
        const car ={
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        }

        await req.storage.createCar(car)

        res.redirect('/')
    }
}
