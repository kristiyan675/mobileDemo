module.exports = {
    async homeController(req, res) {
        const cars = await req.storage.getAll(req.query)
        res.render('index', {cars, query: req.query})
    }
}


