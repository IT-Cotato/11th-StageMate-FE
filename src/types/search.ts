export type ImageItem = {
  title: string;
  link: string;
  thumbnail: string;
  sizeheight: string;
  sizewidth: string;
};

export type ImageSearchResponse = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: ImageItem[];
};
