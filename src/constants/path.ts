const PATH = {
  ONBOARDING: "/onboarding",
  LOGIN: "/login",
  REGISTER: "/register",

  HOME: "/",

  HISTORY: "/history",
  SCAN_RECEIPT: "/scan-receipt",
  ADD_EXPENSE: (value?: number, date?: string, description?: string) => ({
    pathname: "/add-expense",
    params: { value, date, description },
  }),

  FINANCIAL_TIPS: "/financial-tips",
  FINANCIAL_TIP: (tipId: number) => ({
    pathname: "/financial-tips/[tipId]",
    params: { tipId },
  }),

  ANALYTICS: "/analytics",

  CATEGORIES: "/categories",
  CATEGORY: (categoryId: number, categoryName: string) => ({
    pathname: "/categories/[categoryId]",
    params: { categoryId, categoryName },
  }),

  PROFILE: "/profile",
  UPDATE_INFORMATION: "/profile/update",
  CHANGE_PASSWORD: "/profile/change-password",
};

type IPath = Record<keyof typeof PATH, any>;

export default PATH as IPath;
