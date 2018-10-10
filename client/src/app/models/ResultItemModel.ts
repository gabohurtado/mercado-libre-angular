import { Author } from './AuthorModel';
import { ItemModel } from './ItemModel';
import { PathModel } from './PathModel';

export interface ResultItemModel {
  author: Author;
  item: ItemModel;
  path_from_root: PathModel[];
}
