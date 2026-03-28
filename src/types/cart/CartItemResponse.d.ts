import { CartItemOptionSelectionResponse } from "./CartItemOptionSelectionResponse";

export interface CartItemResponse {
  id: string;
  productId: number;
  productName: string;
  productImageUrl?: string;
  selectedOptions?: CartItemOptionSelectionResponse[];
  unitPrice: number;
  quantity: number;
  subTotal: number;
}
