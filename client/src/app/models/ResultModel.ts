import { Author } from './AuthorModel';
import { ItemModel } from './ItemModel';
import { PathModel } from './PathModel';

export interface ResultModel {
  author: Author;
  categories: string[];
  items: ItemModel[];
  path_from_root: PathModel[];
}
