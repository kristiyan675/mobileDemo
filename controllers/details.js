module.exports = {
    async details(req, res){

        const id = req.params.id
        const car = await req.storage.getById(id)

        if(req.session.user && car.owner == req.session.user.id){
            car.isOwner = true
        }

        res.render('details',{car})
    }
}