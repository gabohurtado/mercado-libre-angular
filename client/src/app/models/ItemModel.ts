import { Price } from './PriceModel';
import { PathModel } from './PathModel';

export interface ItemModel {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    address_state: string;
    path_from_root: PathModel[];
    description?: string;
}
