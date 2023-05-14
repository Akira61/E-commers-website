export async function id(){
    const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
    const ID = await response.text();
    return ID
}