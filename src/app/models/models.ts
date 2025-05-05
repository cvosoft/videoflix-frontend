// app/models/models.ts
export interface Predigt {
    id: number;
    title: string;
    video_url: string;
    date: string;
    thumbnail: string;
  }
  
  export interface Serie {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    predigten: Predigt[];
  }