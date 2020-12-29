function checkMultipleProperties(obj, props) {
    return props.every(prop => obj.hasOwnProperty(prop));
}
