import { NavLink } from 'react-router-dom';

export default function NavLinkItem({ to, icon: Icon, children }) {
  // A classe será dinâmica: adiciona 'text-blue-600' se o link estiver ativo.
  const activeClassName = "text-blue-600 font-semibold";
  const inactiveClassName = "text-gray-700 hover:text-blue-600";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-1 transition-colors ${isActive ? activeClassName : inactiveClassName}`
      }
    >
      {Icon && <Icon size={16} />}
      {children}
    </NavLink>
  );
}