const PiratesController = require('../controllers/pirates.controller');
console.log("PiratesController is =>", PiratesController)

module.exports = app => {
    app.get('/api/pirates', PiratesController.readAll);
    app.get('/api/pirates/:id', PiratesController.readOne);
    app.post('/api/pirates', PiratesController.create);
    app.patch('/api/pirates/:id', PiratesController.update);
    app.delete('/api/pirates/:id', PiratesController.delete);

}