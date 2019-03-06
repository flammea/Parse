var input = `body a {
    background-color: #f0f0f2;
    margin: 0;
    padding: 0;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    
}`;

var output = {
    properties: []
};
let selector = '';
let collectingSelector = true;
let name = '';
let value = '';
let collectingName = true;
let collectingValue = false;


for (let i = 0; i < input.length; i++) {

    if (input[i] === '{') {
        output.selector = selector.trim();
        collectingSelector = false;
        collectingName = true;
    }
    if (collectingSelector) {
        selector += input[i];
    }
    if (input[i] === ':') {
        collectingValue = true;
        collectingName = false;
    }
    if (collectingName) {
        name += input[i];
    }
    if (collectingValue) {
        value += input[i];
    }
    if (input[i] === ';') {
        output.properties.push({
            'name': name.replace('{', '').trim(),
            'value': value.replace(':', '').replace(';', '').slice(1)
        });
        value = '';
        name = '';
        collectingValue = false;
        collectingName = true;
    }
}

console.log(output);


// First version - without name & value

// for (let i = 0; i < input.length; i++) {

//     if (input[i] === '{') {
//         output.selector = selector.trim();
//         collectingSelector = false;
//         collectingProperty = true;
//     }
//     if (collectingSelector) {
//         selector += input[i];
//     }
//     if (collectingProperty) {
//         property += input[i];
//     }
//     if (input[i] === ';') {
//         output.properties.push(property);
//         property = '';
//     }
// }