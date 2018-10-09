import { Price } from './PriceModel';

export interface Item {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    address_state: string;
    path_from_root: string;
    description?: string;
}
