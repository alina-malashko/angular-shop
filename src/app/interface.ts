export interface IProduct {
  product: string,
  price: number,
  photo: string,
  balance: number,
  code: number
}

export interface ICard extends IProduct {
  state: string,
  newId: number
}