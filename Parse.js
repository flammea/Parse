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
let collectingName = false;
let collectingValue = false;


for (let i = 0; i < input.length; i++) {

    if (input[i] === '{') {
        output.selector = selector.trim();
        collectingSelector = false;
        collectingName = true;
        continue
    }
    if (collectingSelector) {
        selector += input[i];
    }
    if (input[i] === ':') {
        collectingValue = true;
        collectingName = false;
        continue;
    }
    if (input[i] === ';') {
        output.properties.push({
            'name': name.trim(),
            'value': value.trim()
        });
        value = '';
        name = '';
        collectingValue = false;
        collectingName = true;
        continue
    }
    if (collectingName) {
        name += input[i];
    }
    if (collectingValue) {
        value += input[i];
    }

}

console.log(output);