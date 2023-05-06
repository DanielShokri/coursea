import {
  BookOpenIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/outline";
import { RoutePaths } from "../../common/interfaces/commonInterfaces";
import { useBoundStore } from "../../store/store";

interface navbarItems {
  name: string;
  icon: any;
  href: string;
}

interface userNavigationItems {
  name: string;
  href: string;
  handler?: () => void;
}

export const navigation: navbarItems[] = [
  {
    name: "Overview",
    href: RoutePaths.dashboard,
    icon: HomeIcon,
  },
  {
    name: "Courses",
    href: RoutePaths.courses,
    icon: BookOpenIcon,
  },
  { name: "Mentors", href: RoutePaths.mentors, icon: FolderIcon },
  { name: "Messages", href: RoutePaths.messages, icon: InboxIcon },
];

export const userNavigation: userNavigationItems[] = [
  { name: "Your Profile", href: RoutePaths.profile },
  { name: "Settings", href: "#" },
  {
    name: "Sign out",
    href: "#",
    handler: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      useBoundStore?.getState()?.logout?.();
    },
  },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
