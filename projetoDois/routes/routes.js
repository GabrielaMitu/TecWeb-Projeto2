// Import express router
let Router = require('express').Router();
// Set default API response
Router.get('/', function (req, res){
    res.json({
        status: 'WORKING',
        message: 'This is the /api/ route!'
    });
});
// Export API routes
module.exports = Router;