const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');


module.exports = async function (expressApp){
    expressLoader(expressApp);
    console.log('⭐ express loaded.');

    await mongooseLoader();
    console.log('⭐ Mongoose loaded.');
}