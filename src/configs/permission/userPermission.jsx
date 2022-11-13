export class Permission {
  user = null;
  permissions = [];
  roles = [];
  constructor() {
    this.updateValues();
  }

  updateValues() {
    let u = localStorage.getItem('userData');
    this.user = u ? JSON.parse(u) : null
    this.permissions = this.user ? JSON.parse(this.user.permissions) : []
    this.roles = this.user &&this.user.role &&JSON.parse(this.user.role)||[]
  }
  can(permission) {
    if (!this.user){
      this.updateValues();
    }
    return this.permissions.includes(permission);
  }
}

// export const useCurrentUser=()=>{
//  let user = null;
//  let permissions = [];
//  let roles = [];

//  function updateValues() {
//   let u = localStorage.getItem('userData');
//   user = u ? JSON.parse(u) : null
//   permissions = user ? JSON.parse(user.permissions) : []
//   roles = user &&user.role &&JSON.parse(user.role)||[]
// }

// if(!user){
// updateValues();
// }
//   return {
//     user,
//     permissions,
//     roles
//   }

// }
