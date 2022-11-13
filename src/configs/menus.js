import { toAbsoluteUrl } from "../../_metronic/_helpers"



export const menus =(permissions)=>{ 
    
  const menusList = [
    {
      section: false,
      url: "/dashboard",
      title: "Dashboard",
      svg: toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")
    },


    {
      section: false,
      url: "/product/list",
      title: "Products",
      permission:"read_product",
      svg: toAbsoluteUrl("/media/svg/icons/Home/Library.svg")
    },
    {
      section: false,
      url: "/brand/list",
      title: "Brand",
      permission:"read_brand",
      svg: toAbsoluteUrl("/media/svg/icons/Home/Library.svg")
    },

    {
      section: true,
      title: "User Managment",
    },
    {
      section: false,
      url: "/user-managment/list",
      title: "Users",
      permission:"read_user",
      svg: toAbsoluteUrl("/media/svg/icons/Home/Library.svg")
    },
    ,
    {
      section: false,
      url: "/user-managment/role",
      title: "Roles",
      permission:"read_role",
      svg: toAbsoluteUrl("/media/svg/icons/Home/Library.svg")
    },
    {
      section: true,
      title: "Setting",
    },
    {
      section: false,
      url: "/representives",
      title: "Setting",
      // permission:"read_setting",
      svg: toAbsoluteUrl("/media/svg/icons/Code/Settings4.svg")
    }
  ]

    return menusList.filter((menu) => 
     !menu.permission || permissions.includes(menu.permission)
    );
}
