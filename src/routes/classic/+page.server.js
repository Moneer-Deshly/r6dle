import { dbClient } from "$lib/db"
import r6operators, { alibi, doc, getSVGIcon, recruit_blue, recruit_green, recruit_orange, recruit_red, recruit_yellow } from "r6operators";
import { operatorTable } from "../../lib/schema";


export const load = async() => {
    

    const rows = await dbClient.select().from(operatorTable)
    console.log(rows)
    return { rows }
}
// TEST TEST
//export const actions = {
//    dailyOperator = {
//        /**
//            * Returns all the operators in an object.
//            */
//        let rawOperators = Object.entries(r6operators).map(element => {  
//            return element[1]
//        });
//    
//        let rawOperatorsList = []
//    
//        /**
//         * Makes a list of all the operators.
//         */
//        Object.entries(rawOperators).forEach(element => {
//            rawOperatorsList.push(element[1]);
//        });
//    
//        /**
//         * Removes other recruit versions.
//        */
//        rawOperatorsList = rawOperatorsList.filter(element => {
//            return element.id != "recruit_green" && element.id != "recruit_orange" && element.id != "recruit_yellow" && element.id != "recruit_red" && element.id != "recruit_blue";
//        });
//    
//        let random = Math.floor(Math.random() * rawOperatorsList.length);
//        const operator = rawOperatorsList[random].id;
//    
//        dbClient.insert(operatorData).values({ operatorName: operator })
//    }
//}