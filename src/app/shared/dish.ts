import { Comment } from './comment';

export class Dish {
    _id: string;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    favorite:boolean;
    description: string;
    comments: Comment[];
}