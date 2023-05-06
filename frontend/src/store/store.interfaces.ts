// Store Interfaces
export interface UserState {
  isLoggedIn: boolean;
  currUser: User;
  setCurrUser?: (currUser: User) => void;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
  logout?: () => void;
}

export interface CoursesState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

//  Interfaces
export interface User {
  name: string;
  role: string;
  createdAt: Date | null;
  coursesEnrolled: CoursesEnrolled[];
  email: string;
  id: string;
}

export interface CoursesEnrolled {
  dateEnrolled: Date;
  courseId: string;
  course: Course;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
  };
  price: number;
  imageUrl: string;
  courseEnrollments: [];
  level: string;
}
