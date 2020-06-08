import { PlaceLocation } from 'src/app/shared/models/location.model';

export interface Place {
    id: string;
    userId: string;
    title: string;
    description?: string;
    image: Array<string>;
    price: number;
    availableFrom: Date;
    availableTo: Date;
    location: PlaceLocation;
}
