import { IFakeProductRating } from "../classes/IFakeProductRating"
export interface IFakeProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: IFakeProductRating 
}