export interface InputProps {
  placeholder?: string;
  type?: string;
  label?: string;
  name: string;
  errors?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  icon?: JSX.Element;
}

export interface ErrorObject {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
}

export const RoutePaths = {
  dashboard: "/",
  login: "login",
  courses: "/courses",
  course: "courses/:id",
  profile: "/profile",
  editProfile: "/profile/edit",
  profileSetting: "/profile/setting",
  profileNotification: "/profile/notifications",
  profileCourses: "/profile/courses",
  mentors: "mentors",
  messages: "messages",
};

export enum InputNames {
  name = "name",
  email = "email",
  password = "password",
  confirmPassword = "confirmPassword",
  text = "text",
}
