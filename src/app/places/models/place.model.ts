export interface Place {
    id: string;
    userId: string;
    title: string;
    description?: string;
    image: Array<string>;
    price: number;
    availableFrom: Date;
    availableTo: Date;
}
