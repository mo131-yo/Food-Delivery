export type FoodCategory = {
  _id: string;
  categoryName: string;
  count: number;
  foods: {
    _id: string;
    foodName: string;
    foodPrice: number;
    foodImage: string;
    ingredients?: string;
    category: any; // 👈 '?' -ийг устгаад заавал байх ёстой болгоно
    image?: string;
    price?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};