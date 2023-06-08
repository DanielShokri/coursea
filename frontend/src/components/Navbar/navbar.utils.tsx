import {
  BookOpenIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { RoutePaths } from "../../common/interfaces/commonInterfaces";
import { useBoundStore } from "../../store/store";

interface navbarItems {
  name: string;
  icon: any;
  href: string;
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

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
