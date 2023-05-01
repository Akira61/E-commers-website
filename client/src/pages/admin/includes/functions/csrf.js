
export const csrf = Get_csrfToken();
async function Get_csrfToken(){
    // get
    const response = await fetch("http://localhost:4000/set-csrfToken", {credentials : 'include'});
    const data = response.text();
    if(data){
        return data
    }
}