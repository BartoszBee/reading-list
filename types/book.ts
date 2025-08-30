export type BookStatus = "to-read" | "reading" | "finished";

export interface Book {
    id:string;
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
    rating ?:number;
    notes ?: string;
    createdAt: number;
    updatedAt: number;
}

