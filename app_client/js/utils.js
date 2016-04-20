/**
 * clone models used in this project
 * @param  {object} model         Model from which to create new object
 * @param  {object} objectToClone Object to clone
 * @return {object}               Cloned object
 */
var cloneModelObject = function(model, objectToClone){
    return new model(JSON.parse(JSON.stringify(objectToClone)));
};

module.exports = {
    cloneModelObject: cloneModelObject
}
