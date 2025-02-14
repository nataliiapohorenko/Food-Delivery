import { CardTypeEnum } from './card-type.enum';

export interface FoodItemInterface {
  type: CardTypeEnum.FoodItem;
  _id: string;
  name: string;
  imgUrl: string;
  price: number;
  description: string;
  rating: number;
  feedbacks: number;
  isFavourite: boolean;
  ingredients: string[];
  restaurantId: string;
  addons: {
    _id: string;
    name: string;
    price: number;
    countable: boolean;
  }[];
}
