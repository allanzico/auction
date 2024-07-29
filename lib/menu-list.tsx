

  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    submenus: Submenu[];
  };
  

  export function MenuList(pathname: string): Menu[] {
    return [
          {
            href: "/sponsor",
            label: "Sponsor",
            active: pathname  === "/sponsor",
            submenus: [
            ]
          },{
            href: "/school",
            label: "School",
            active: pathname  === "/school",
            submenus: [

            ]
          },
          {
            href: "/projects",
            label: "Projects",
            active: pathname  === "/projects",
            submenus: []
          },
          {
            href: "/gallery",
            label: "Gallery",
            active: pathname  === "/gallery",
            submenus: []
          },
          {
            href: "/about",
            label: "About",
            active: pathname  === "/about",
            submenus: []
          },
          {
            href: "/contact",
            label: "Contact",
            active: pathname  === "/contact",
            submenus: []
          },
    ];
  }