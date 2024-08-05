
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
          }
    ];
  }