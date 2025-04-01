import { NavLink } from 'react-router';

export const Menu = ({children}) => {

  return (
    <ul className="w-full bg-neutral-50overflow-hidden">
      {children}
    </ul>
  )
}


export const MenuItem = ({route="/", label, icon}) => {
  return (
    <li>
      <NavLink 
        to={route}
        end
        className={ ({ isActive }) =>
          isActive 
            ? `flex flex-row justify-right items-center gap-4 p-3 rounded-sm bg-neutral-700 text-white` 
            : `flex flex-row justify-right items-center gap-4 p-3 rounded-sm bg-white text-neutral-600 hover:text-neutral-700 hover:bg-neutral-300`}
      >
        {icon ? icon : null}
        <span>{label}</span>
      </NavLink>
    </li>
  )
}