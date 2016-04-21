/**
 * Clone models used in this project
 * @param  {object} model         Model from which to create new object
 * @param  {object} objectToClone Object to clone
 * @return {object}               Cloned object
 */
var cloneModelObject = function(model, objectToClone){
    return new model(JSON.parse(JSON.stringify(objectToClone)));
};


/**
 * indexOfID Find element in array by id and return Index. Add fields are m.prop
 * @param  {array}  array       Array of elements
 * @param  {object} find        Object to be found
 * @return {object}             index
 */
var indexOfID = function(array, find){
    return array.map(function(elem, index){
        return elem.id();
    }).indexOf(find.id())
};

module.exports = {
    cloneModelObject: cloneModelObject,
    indexOfID: indexOfID
}
