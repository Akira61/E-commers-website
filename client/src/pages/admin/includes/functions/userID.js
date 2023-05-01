

export function get_user_id (){
    fetch("http://localhost:4000/user",{credentials : "include",})// fetching user's id
        .then(res => res.json())
        .then(ID => {
            //console.log(ID)
            return ID;
        });
}

console.log(get_user_id())