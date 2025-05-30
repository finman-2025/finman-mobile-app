import type { ExpenseType } from "@/types/dto";

export const categoryColors: Record<ExpenseType, string[]> = {
  INCOME: ["#44dd66", "#77eeee", "#ffbbbb"],
  OUTCOME: ["#ff6666", "#ffbb33", "#33ccbb", "#33aaff"],
};

export const getCategoryColor = (type: ExpenseType, id: number): string => {
  return id === 0 || !(type in categoryColors)
    ? "#cccccc"
    : categoryColors[type][id % categoryColors[type].length];
};
