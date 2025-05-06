const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  ONBOARDING: "/onboarding",
  HISTORY: "/history",
  CATEGORIES: "/categories",
  CATEGORY: (categoryId: number | string) => ({
    pathname: "/categories",
    params: { categoryId },
  }),
  ANALYTICS: "/analytics",
};

type IPath = Record<keyof typeof PATH, any>;

export default PATH as IPath;
