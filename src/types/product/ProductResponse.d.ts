export interface ProductResponse {
  id: string;
  productCategoryId: string;
  productCategoryName: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  productOptionIds: string[];
}
