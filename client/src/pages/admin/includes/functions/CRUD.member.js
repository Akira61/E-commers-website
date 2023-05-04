const { default: Swal } = require("sweetalert2");



// ********************* Add member*****************
export async function addMember(userId){

    // insert new member data
    const { value : insertMember } = await Swal.fire({
      icon : 'question',
      iconColor : 'green',
      title : 'Add New Member',
      confirmButtonColor : 'green',
      confirmButtonText : 'Add Member',
      showCancelButton : true,
      showCloseButton: true,
      html : `
          <form>
              <div class="form-row">
              <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="name" placeholder="Member's Name" required>
              </div>
              <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="email" placeholder="Member's Email" required>
              </div>
              </div>
              <div class="form-group col-md-6">
              <input type="password" class="form-control" id="password" placeholder="Member's Password" required>
              </div>
              <div class="form-group col-md-6">
              <input type="text" class="form-control" id="role" placeholder="Role Name" required>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="checkBox">
                <label class="form-check-label" for="checkBox">Admin pormission</label>
              </div>
              </div>
          </form>`,
      preConfirm: () => {
        return {
          name : document.getElementById('name').value,
          email : document.getElementById('email').value,
          password : document.querySelector('#password').value,
          role : document.querySelector('#role').value,
          admin : document.querySelector('#checkBox').checked,
        }
      }
    });

    // check fields
    if(!insertMember.name || !insertMember.email, !insertMember.password, !insertMember.role){
      const warning = await Swal.fire({
        icon : 'warning',
        iconColor : 'red',
        title : "Please complete the form",
        showCancelButton : true
      });
      // on 'ok' button click
      if(warning.isConfirmed){
        addMember();
      }
      return;
    }

    //send member data
    const response = await fetch("http://localhost:4000/staff/manage/add-member", {
      method : 'POST',
      credentials : 'include',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        userId,
        name : insertMember.name,
        username : insertMember.email,
        password : insertMember.password,
        role : insertMember.role,
        admin : insertMember.admin,
      })
    });

    const data = await response.json();

    // if there is an error fire a popup
    if(data.err_message){
      const warning = await Swal.fire({
        icon : 'warning',
        iconColor : 'red',
        title : "Something Went Rowng",
        text  : data.err_message,
        showCancelButton : true
      });
      // on 'ok' button click
      if(warning.isConfirmed){
        addMember();
      }
      return;
    }
    // if everything is correct 
    if(data.success){
      //password updated succssfully, fire success popup
      const success = await Swal.fire({
        icon : 'success',
        title : "New Member Added"
      })
      
      // on 'ok' button click
      if(success.isConfirmed){
        // reload the page
        window.location.reload();
      }
    }
    
}



// *******************Edit memeber*******************
export async function EditMember(memberId,userId){
    console.log(memberId)
    //send request to get member info
    const response = await fetch(`http://localhost:4000/admin/get-member/${memberId}`, {
      method : "get",
      credentials : "include",
    });
    const data = await response.json();
    if(!response.ok){
      return;
    }
    console.log(data)

    //edit popup
    popup()
    async function popup(){
      
      const member = await Swal.fire({
        icon : 'info',
        iconColor : 'gold',
        title : 'Edit Member',
        confirmButtonColor : 'gold',
        confirmButtonText : 'Edit Member',
        showCancelButton : true,
        showCloseButton: true,
        html : `
            <form>
                <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="name" value="${data.name}">
                </div>
                <div class="form-group col-md-6">
                    <input type="email" class="form-control" id="email" value=${data.username}>
                </div>
                </div>
                <div class="form-group col-md-6">
                <input type="text" class="form-control" id="role" value=${data.role}>
                </div>
            </form>`,
        preConfirm: () => {
          return {
            name : document.getElementById('name').value,
            email : document.getElementById('email').value,
            role : document.querySelector('#role').value,
          }
        }
      });


      //send new data
      if(member.isConfirmed){
        console.log(member.value)
        const response = await fetch(`http://localhost:4000/admin/edit-member`, {
          method : 'PUT',
          headers : {"Content-Type" : "application/json"},
          credentials : "include",
          body : JSON.stringify({
            name : member.value.name,
            username : member.value.email,
            role : member.value.role,
            userId,
            memberId,
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
              popup();
          }
        }
        if(data.success){
          //password updated succssfully, fire success popup
          const success = await Swal.fire({
            icon : 'success',
            title : "Member Updated"
          })
          // on 'ok' button click
          if(success.isConfirmed){
            // reload the page
            window.location.reload();
          }
        } 
        
          
      }

    }

}



// *************************delete member******************
export async function DeleteMember(memberId,userId){

    //warning before actions
    const {value : deletedProduct } =await Swal.fire({
      icon : 'warning',
      iconColor : 'red',
      confirmButtonColor : 'gray',
      title : 'هل انت متأكد؟',
      showCancelButton : true,
      showCloseButton: true,
    });

    if(deletedProduct){
      const sendReq = await fetch(`http://localhost:4000/admin/delete-member/${userId}/${memberId}`, {
        method: "DELETE",
        credentials : "include"
      });
      const data = await sendReq.json()
      console.log(data)

      if(data.success){
        //password updated succssfully, fire success popup
        const success = await Swal.fire({
          icon : 'success',
          title : "Member Deleted"
        })
        // on 'ok' button click
        if(success.isConfirmed){
          // reload the page
          window.location.reload();
        }
      } 
    }
    
  }