module.exports = {
    async get(req, res){
        const id = req.params.id
        let car = await req.storage.getById(id)
        if (car.owner != req.session.user.id ){
            console.log('User is not owner')
            return res.redirect('/login')

        }
        res.render('delete', {car})
    },
    async post(req, res){
        console.log('confirmed deletion', req.params.id)

        const id = req.params.id
        try {
         if(await req.storage.deleteById(id, req.session.user.id)){
             res.redirect('/')
         }
            else {
                console.log('False User for Delete')
                res.redirect('/login')
         }
        }
        catch (e){
            throw new Error("Failed to delete")
        }

    }

}