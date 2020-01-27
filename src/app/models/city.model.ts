import { PointOfInterest } from './point-of-interest.model';

export interface City {
    id: number;
    name: string;
    description: string;
    link: string;
    pointOfInterests: PointOfInterest[];
}
