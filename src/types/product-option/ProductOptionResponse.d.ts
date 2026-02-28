export interface ProductOptionResponse {
  id: string;
  name: string;
  isRequired: boolean;
  isMultiSelect: boolean;
  sortOrder: number;
  productIds: string[];
}
