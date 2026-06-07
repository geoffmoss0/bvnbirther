import modifier from "./modifier";

/**
 * Replaces bracketed sections of text with the dice roll value
 * @param {*} inputString String with dice to roll, in the form ...[NDN+NDN+1/TOU]...
 * @param {*} toughness TOU value for the purpose of calculating HP
 * @returns A string with the bracketed section replaced with the resulting roll
 */
export default function diceParser(inputString, toughness = 0) {
    // console.log("parsing " + inputString);
    // can loop this later if I ever need to do multiple replacements per string
    if (inputString.includes("[")) {
        return inputString.substring(0, inputString.indexOf("[")) + 
        parse(inputString.substring(1, inputString.indexOf("]")), toughness).toString()
        + inputString.substring(inputString.indexOf("]") + 1);
    } else {
        // nothing to be done
        return inputString;
    }
}

/*
 * Recursive function that calculates NDN+NDN.... dice values 
 * This parser is limited in that it expects the form [NDN+/-NDN+/-...+/-N]
 * An exception is made for TOU due to HP
 */
function parse(str, toughness) {
    if (!str.includes("D")) {
        // done parsing NDN clauses (real base case)

        // if there is a number at the end (so the form NDN+1)
        if (/\d/g.test(str)) {
            return parseInt(str);
        } else if (str.includes('TOU')) {
            let mod = parseInt(modifier(toughness))
            return mod;
        }
        // fallback
        return str;
    } else {
        // need to parse NDN clause and possibly recurse
        let D = str.indexOf('D');
        let amt = str.substring(0, D);
        let dice = str.substring(D, str.length).match(/\d+/g)[0]; //first index of numbers past D
        // 1000D2345

        let total = 0;
        for (let i = 0; i < parseInt(amt); i++) {
            let roll = Math.floor((Math.random() * parseInt(dice)) + 1);
            total += roll;
        }
        // console.log("total:" + total.toString());

        // next character after NDN clause
        let next = str.substring(D+1).search(/\D/g);

        if (next >= 0) {
            // check for math

            if (str.includes('+')) {
                let res =  total + parse(str.substring(D + next + 2), toughness); // after the D, then after the next non-number part, after the plus/minus
                console.log("res: " + res.toString());
                return res;
            } else if (str.includes('-')) {
                let res = total - parse(str.substring(D + next + 2), toughness); // after the D, then after the next non-number part, after the plus/minus
                return res;
            } else {
                // adding a modifier
                if (str.includes('TOU')) {
                    // for now, we assume we'll only ever be adding one thing 
                    // and that thing is toughness
                    return total + toughness;
                }
            }

        } else {
            // just parse, no math (psueo-base case)
            return total;
        }
    }
}