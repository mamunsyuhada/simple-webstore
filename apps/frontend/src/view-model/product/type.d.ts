export interface ListProductPayload {
  page: number;
  limit: number;
}

interface ProductMeta {
  total: string;
  page: number;
  limit: number;
}

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

interface ListProductResponse {
  meta: ProductMeta;
  data: Product[];
}


export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}