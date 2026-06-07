


export default function weaponParser(input, level) {

    if (input === undefined) return;

    console.log("weapon parsing " + input);

    let working = input.slice(0, input.length);

    console.log("after copy: " + working);

    while (working.includes('[')) {
        // loop while there are brackets to be replaced
        let start = working.indexOf('[');
        let slash1 = working.indexOf('/');
        let slash2 = working.substring(slash1+1).indexOf('/') + slash1 + 1; 
        let end = working.indexOf(']'); // this will be the first instance if there are multiple
        let use;

        // if level 1, get the entry up until the first slash
        if (level === 1) {
            use = working.substring(start+1, slash1)
        } else if (level === 2) {
            use = working.substring(slash1+1, slash2);
        } else { // 3+
            use = working.substring(slash2+1, end);
        }

        working = working.substring(0, start) + use + working.substring(end+1);
    }

    return working;
}