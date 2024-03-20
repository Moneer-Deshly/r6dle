import r6operators from "r6operators";

/**
 * Returns all the operators in an object.
 */
let rawOperators = Object.entries(r6operators).map(element => {  
    return element[1]
});

let rawOperatorsList = []

export function getCleanList() {

    /**
     * Makes a list of all the operators.
     */
    Object.entries(rawOperators).forEach(element => {
        rawOperatorsList.push(element[1]);
    });

    /**
     * Removes all recruit versions.
    */
    rawOperatorsList = rawOperatorsList.filter(element => {
        return element.id != "recruit_green" && element.id != "recruit_orange" && element.id != "recruit_yellow" && element.id != "recruit_red" && element.id != "recruit_blue";
    });

    
    return rawOperatorsList;
}

export function getRandomOp() {
    let random = Math.floor(Math.random() * rawOperatorsList.length);
    return rawOperatorsList[random];
}

export function removeOperator(operator) {
    rawOperatorsList = rawOperatorsList.filter(element => {
        return element.id != `${operator}`;
    });
}