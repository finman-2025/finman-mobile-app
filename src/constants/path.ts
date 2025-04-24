const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  ONBOARDING: "/onboarding",
  HISTORY: "/history",
  ANALYTICS: "/analytics",
};

type IPath = Record<keyof typeof PATH, any>;

export default PATH as IPath;
