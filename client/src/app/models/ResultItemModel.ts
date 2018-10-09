import { Author } from './AuthorModel';
import { Item } from './ItemModel';
import { Path } from './PathModel';

export interface ResultItemModel {
  author: Author;
  item: Item;
  path_from_root: Path[];
}
