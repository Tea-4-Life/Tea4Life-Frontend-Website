import type { NewsContentType } from "./NewsContentType";

export interface NewsChunkRequest {
  type: NewsContentType;
  content: string;
  sortIndex: number;
}

export interface NewsRequest {
  title: string;
  thumbnailUrl: string;
  categoryId: number;
  chunks: NewsChunkRequest[];
}

export interface NewsCategoryRequest {
  name: string;
}
