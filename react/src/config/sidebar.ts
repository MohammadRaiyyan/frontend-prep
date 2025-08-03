import type { LucideProps } from "lucide-react";
import type dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends Omit<LucideProps, "ref"> {
    name: keyof typeof dynamicIconImports;
}
type SidebarOption = {
    id: string,
    title: string,
    path: string,
    icon: IconProps["name"]
}

export const sidebarOptions: SidebarOption[] = [
    { id: "todo", icon: "list-checks", title: "Keeper", path: "/" },
    { id: "job-board", icon: "grid-2-x-2-plus", title: "Job Board", path: "/job-board" },
]