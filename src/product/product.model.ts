export class ProductModel {
    image: string;
    title: string;
    price: number;
    oldPice: number;
    credit: number;
    calculatedRating: number;
    description: string;
    advantages: string;
    disAdvantages: string;
    categories: string[];
    tags: string[];
    characteristics: {
        [key: string]: string;
    }[];
}
