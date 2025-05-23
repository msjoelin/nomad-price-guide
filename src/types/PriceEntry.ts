
export interface PriceEntry {
  id: string;
  category: string;
  itemName: string;
  price: number;
  currency: string;
  location: string;
  comment?: string;
  submittedAt: Date;
  submittedBy: string;
}
