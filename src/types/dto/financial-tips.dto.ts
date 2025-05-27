export type FinancialTipDto = {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImage?: string;
  date: Date;
  type?: string;
};
