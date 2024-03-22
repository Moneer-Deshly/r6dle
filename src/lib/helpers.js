import r6operators from "r6operators";

// Simplify the initial creation of the operators list by directly mapping and filtering in one step
const allOperators = Object.values(r6operators).filter(operator => {
    // Check if the operator is not one of the recruits
    const isNotRecruit = !["recruit_green", "recruit_orange", "recruit_yellow", "recruit_red", "recruit_blue"].includes(operator.id);
    return isNotRecruit;
});

// This function now simply returns a clone of the allOperators array to ensure immutability when used outside
export function getCleanList() {
    return [...allOperators];
}

// Initialize the list with the non-recruit operators
let operatorList = getCleanList();

export function getRandomOp() {
    const randomIndex = Math.floor(Math.random() * operatorList.length);
    return operatorList[randomIndex];
}