import React, { useEffect, useState } from 'react'
import Navbar_ from '../admin/includes/components/Navbar'
import "../../style/user.profile.css"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Edit_profile() {

    const redirect = useNavigate()

    const [userId, setUserId] = useState("");

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
        
 
        // get user id
        id();
        async function id(){
            const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
            const ID = await response.text();
            setUserId(ID);
        }
        console.log(userId);

        
        // get user data
        window.onload =  getData();
        async function getData(){
            const response = await fetch(`http://localhost:4000/edit-profile`, {
                method : "POST",
                credentials : 'include',
                body : JSON.stringify({userId})
            })
    
            // redirect if user not auth
            if(response.status == 401){
                return redirect("/");
            }
            const data = await response.json();
            setUsername(data.username);
            setName(data.name);
        }
    },[])
    
    

    //push new data
    async function pushChange(){

        if(!name && !username) return setErrMessage("please fill the inputs")
        
        try {
            const response = await fetch(`http://localhost:4000/edit-profile/`,{
                method : "put",
                credentials : "include",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({userId, name, username})
            });
            const data = await response.json()
            if(data.err_message){
                setErrMessage(data.err_message);
            }

            //fire success popup
            if(data.success){
                Swal.fire({
                    icon : 'success',
                    title : "information saved",
                    confirmButtonColor : 'green'
                });
                redirect('/');
            }
            
        } catch (error) {
            
        }
        
    }
    

    //change password 
    async function changePass(){
        
        const { value : updatePassword } = await Swal.fire({
            icon : 'info',
            iconColor : 'gold',
            title : ' تغيير كلمة المرور ',
            confirmButtonColor : 'green',
            confirmButtonText : 'Save',
            showCancelButton : true,
            html : `
                <form>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <input type="password" class="form-control" id="currentPass" placeholder="password">
                    </div>
                    <div class="form-group col-md-6">
                        <input type="password" class="form-control" id="newPass" placeholder="New Password">
                    </div>
                    </div>
                    <div class="form-group col-md-6">
                    <input type="password" class="form-control" id="confirmPass" placeholder="Confierm Password">
                    </div>
                </form>`,
            preConfirm: () => {
            return {
                currentPass : document.getElementById('currentPass').value,
                newPass : document.getElementById('newPass').value,
                confirmPass : document.querySelector('#confirmPass').value,
            }
            }
        });

        // check if filleds are filled
        if(!updatePassword.currentPass || !updatePassword.newPass || !updatePassword.confirmPass){
            const warning = await Swal.fire({
                icon : 'warning',
                iconColor : 'red',
                title : "Please complete the form",
                showCancelButton : true
            });
            // on 'ok' button click
            if(warning.isConfirmed){
                changePass()
            }
            return;
        }


        // send changes
        const response = await fetch(`http://localhost:4000/change-password/`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json"
            },
            credentials : 'include',
            body : JSON.stringify({
                userId,//send user id
                currentPass : updatePassword.currentPass,
                newPass : updatePassword.newPass,
                confirmPass : updatePassword.confirmPass,
            })
        });

        const data = await response.json();
        
        //handel server error
        if(data.err_message){
            const res = await Swal.fire({
                icon : 'error',
                title : "unvalid data",
                text : data.err_message,
                showCancelButton : true,
            });
            // if user click 'ok' button popup change password
            if(res.isConfirmed){
                changePass();
            }
        }
        if(data.success){
            //password updated succssfully, fire success popup
            Swal.fire({
                icon : 'success',
                title : "information saved"
            })
        }

    }


  return ( 
    <>
        <h1 className='text-center'>Edit profile</h1>
        <br />
            {/* error messages */}
            <span style={{color : 'red'}}>{errMessage}</span>
        <div className='edit-profile-container container'>

            <form className='form-horizontal'>
                {/* name field */}
                <div className='form-group row'>
                    <label className='col-sm-2 control-label' for='name'>Name </label>
                    <div className='col-sm-10 col-md-7'>
                        <input className='form-control' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>

                {/* username field */}
                <div className='form-group row'>
                    <label className='col-sm-2 control-label' for='username'>username </label>
                    <div className='col-sm-10 col-md-7'>
                        <input className='form-control' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                {/* save button */}
                <div className='form-group row'>
                    <div className='col-sm-2 '>
                        <input className='form-control btn btn-success' value="Save" type='button' onClick={() => pushChange()}/>
                    </div>
                </div>

                {/* password change button */}
                <div className='form-group row'>
                    <div className='col-sm-4 '>
                        <input className='form-control btn btn-success' value="change password" type='button' onClick={() => changePass()}/>
                    </div>
                </div>
 

            </form>
        </div>
    </>
  )
}
