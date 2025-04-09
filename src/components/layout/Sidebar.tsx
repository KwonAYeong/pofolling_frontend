import { NavLink } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

interface SidebarProps {
  menu: MenuItem[];
}

const Sidebar = ({ menu }: SidebarProps) => {
  return (
    <aside className="w-60 p-4 border-r min-h-screen bg-white">
      <nav className="flex flex-col gap-3">
        {menu.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-800'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
