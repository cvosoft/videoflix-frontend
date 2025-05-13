// app/models/models.ts
export interface Predigt {
    id: number;
    title: string;
    video_file: string;
    date: string;
    thumbnail_file: string;
    series_title: string;
  }
  
  export interface Serie {
    id: number;
    title: string;
    description: string;
    thumbnail_file: string;
    predigten: Predigt[];
  }