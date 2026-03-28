import { CartItemOptionSelectionRequest } from "./CartItemOptionSelectionRequest";

export interface AddCartItemRequest {
  productId: number;
  productName: string;
  productImageUrl?: string;
  selectedOptions?: CartItemOptionSelectionRequest[];
  unitPrice: number;
  quantity: number;
}
