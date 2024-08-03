
type SuperSubMenu = {
  href: string;
  label: string;
  active: boolean;
};
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };

  type Menu = {
    href: string;
    label: string;
    active: boolean;
    submenus: Submenu[
    ];
  };
  

  export function MenuList(pathname: string): Menu[] {
    return [
          {
            href: "/",
            label: "Auctions",
            active: pathname  === "/",
            submenus: [
              
            ]
          },{
            href: "/school",
            label: "School",
            active: pathname  === "/school",
            submenus: [
              {
                href: "/school/school-of-engineering",
                label: "School of Engineering",
                active: pathname  === "/school/school-of-engineering",
              }
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