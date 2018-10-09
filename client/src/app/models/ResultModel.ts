import { Author } from './AuthorModel';
import { Item } from './ItemModel';
import { Path } from './PathModel';

export interface ResultModel {
  author: Author;
  categories: string[];
  items: Item[];
  path_from_root: Path[];
}
