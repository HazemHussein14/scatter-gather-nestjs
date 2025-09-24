export interface Flight {
  provider: string;
  id: string;
  from: string;
  to: string;
  departAt: string;
  arriveAt: string;
  price: number;
  currency: string;
}
