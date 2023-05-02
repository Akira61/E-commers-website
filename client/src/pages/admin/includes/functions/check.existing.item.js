


/**
 * 
 * 
 * this function will check if item is already on the database
 * or not based on parametars given
 * 
 * 
 */

import { adminUrl } from "./admin.path";


async function ckeckItem(target, table, value){
    
    const response = await fetch(adminUrl.serverHost + "/check-item", {
        method : 'POST',
        credentials : "include",
        body : JSON.stringify({target, table, value})
    })
}