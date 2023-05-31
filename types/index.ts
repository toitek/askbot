export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
}

export type mightyDeals = {
  title: string;
  url: string;
  date: string;
  price: number;
  image: string;
  old_price: number;
  content: string;
  length: number;
  tokens: number;
  chunks: MightyDealChunk[];
};

export type MightyDealChunk = {
  deal_title: string;
  deal_url: string;
  deal_date: string;
  deal_price: number;
  deal_old_price: number;
  deal_image: string;
  content: string;
  content_length: number;
  content_tokens: number;
  embedding: number[];
};

export type MightyDealJSON = {
  current_date: string;
  url: string;
  length: number;
  tokens: number;
  deals: mightyDeals[];
};

export type Articles = {
  title: string;
  url: string;
  content: string;
  length: number;
  tokens: number;
  chunks: ArticleChunk[];
};

export type Article = {
  article_title: string;
  article_url: string;
  content: string;
  content_length: number;
  content_tokens: number;
  embedding: number[];
};

export type ArticleChunk = {
  title: string;
  content: string;
  content_length: number;
  content_tokens: number;
  embedding: number[];
};

export type ArticleJSON = {
  current_date: string;
  url: string;
  length: number;
  tokens: number;
  article: Article[];
};



export type Source = {
  url: string;
  text: string;
};