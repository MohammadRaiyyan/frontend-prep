import { NavLink } from "react-router";
import { sidebarOptions } from "../../config/sidebar";
import Icon from "./Icon";

function Sidebar() {
  return (
    <aside className="h-[calc(100vh-40px)] w-80 card">
      <div className="p-4 font-bold pb-0">
        <h2>Projects</h2>
      </div>
      <ul className="flex flex-col gap-2 p-4 h-full">
        {sidebarOptions.map((option) => (
          <li key={option.id}>
            <NavLink
              className={({ isActive }) =>
                `py-2 px-4 h-12  flex gap-2 items-center  rounded-md  hover:bg-zinc-800/50 ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-500"
                    : "bg-zinc-800/50"
                }`
              }
              to={option.path}
            >
              <Icon name={option.icon} />
              {option.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
