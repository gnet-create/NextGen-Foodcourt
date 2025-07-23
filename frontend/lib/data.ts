export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  dishes: Dish[];
}

export interface Cuisine {
  name: string;
  image: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'reserved' | 'occupied';
}

export interface Review {
  id: string;
  customerName: string;
  outlet: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  restaurantId: string;
}

export const owners: Owner[] = [
  {
    id: '1',
    name: 'Alice Mwangi',
    email: 'alice@tamutamu.com',
    restaurantId: '1', // Tamu Tamu Grills
  },
  {
    id: '2',
    name: 'Brian Otieno',
    email: 'brian@swahiliplates.com',
    restaurantId: '2', // Swahili Plates
  },
  {
    id: '3',
    name: 'Christine Wanjiku',
    email: 'christine@burgerbros.com',
    restaurantId: '3', // Burger Bros
  },
  {
    id: '4',
    name: 'David Kimani',
    email: 'david@sushispot.com',
    restaurantId: '4', // Sushi Spot
  },
  {
    id: '5',
    name: 'Evelyn Njeri',
    email: 'evelyn@spicegarden.com',
    restaurantId: '5', // Spice Garden
  },
  {
    id: '6',
    name: 'Frank Otieno',
    email: 'frank@greenbowl.com',
    restaurantId: '6', // Green Bowl
  }
];


export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Tamu Tamu Grills',
    cuisine: 'BBQ',
    description: 'Authentic grilled meats and vegetables with traditional African spices',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '1', name: 'Grilled Chicken', price: 1200, description: 'Marinated chicken with traditional spices', isPopular: true },
      { id: '2', name: 'Beef Kebabs', price: 1500, description: 'Tender beef skewers' },
      { id: '3', name: 'Grilled Fish', price: 1800, description: 'Fresh fish with herbs' },
    ]
  },
  {
    id: '2',
    name: 'Swahili Plates',
    cuisine: 'Coastal',
    description: 'Traditional Swahili dishes with coconut and spices',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '4', name: 'Chicken Biryani', price: 1000, description: 'Fragrant rice with spiced chicken', isPopular: true },
      { id: '5', name: 'Coconut Rice', price: 600, description: 'Rice cooked in coconut milk' },
      { id: '6', name: 'Fish Curry', price: 1400, description: 'Coconut fish curry' },
    ]
  },
  {
    id: '3',
    name: 'Burger Bros',
    cuisine: 'Fast Food',
    description: 'Juicy burgers and crispy fries for quick meals',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '7', name: 'Classic Burger', price: 800, description: 'Beef patty with lettuce and tomato', isPopular: true },
      { id: '8', name: 'Chicken Burger', price: 750, description: 'Grilled chicken breast burger' },
      { id: '9', name: 'Fries', price: 400, description: 'Crispy golden fries' },
    ]
  },
  {
    id: '4',
    name: 'Sushi Spot',
    cuisine: 'Japanese',
    description: 'Fresh sushi and Japanese favorites',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '10', name: 'California Roll', price: 1200, description: 'Avocado and crab roll', isPopular: true },
      { id: '11', name: 'Salmon Nigiri', price: 1500, description: 'Fresh salmon over rice' },
      { id: '12', name: 'Miso Soup', price: 500, description: 'Traditional soybean soup' },
    ]
  },
  {
    id: '5',
    name: 'Spice Garden',
    cuisine: 'Indian',
    description: 'Authentic Indian curries and breads',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '13', name: 'Butter Chicken', price: 1300, description: 'Creamy tomato chicken curry', isPopular: true },
      { id: '14', name: 'Naan Bread', price: 300, description: 'Fresh baked Indian bread' },
      { id: '15', name: 'Dal Curry', price: 700, description: 'Lentil curry with spices' },
    ]
  },
  {
    id: '6',
    name: 'Green Bowl',
    cuisine: 'Vegan',
    description: 'Healthy plant-based meals and smoothies',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400',
    dishes: [
      { id: '16', name: 'Buddha Bowl', price: 900, description: 'Mixed vegetables and quinoa', isPopular: true },
      { id: '17', name: 'Green Smoothie', price: 500, description: 'Spinach, banana, and mango' },
      { id: '18', name: 'Veggie Wrap', price: 700, description: 'Fresh vegetables in a tortilla' },
    ]
  },
];

export const cuisines: Cuisine[] = [
  { name: 'Coastal', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Indian', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Fast Food', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Vegan', image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'BBQ', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Japanese', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const tables: Table[] = [
  { id: '1', number: 1, capacity: 4, status: 'available' },
  { id: '2', number: 2, capacity: 6, status: 'available' },
  { id: '3', number: 3, capacity: 4, status: 'available' },
  { id: '4', number: 4, capacity: 8, status: 'available' },
  { id: '5', number: 5, capacity: 4, status: 'available' },
  { id: '6', number: 6, capacity: 6, status: 'available' },
  { id: '7', number: 7, capacity: 4, status: 'available' },
  { id: '8', number: 8, capacity: 6, status: 'available' },
  { id: '9', number: 9, capacity: 4, status: 'available' },
  { id: '10', number: 10, capacity: 6, status: 'available' },
];

export const reviews: Review[] = [
  {
    id: '1',
    customerName: 'John Mwangi',
    outlet: 'Tamu Tamu Grills',
    rating: 5,
    comment: 'Amazing grilled chicken! The spices were perfect and the meat was so tender.',
    date: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'Sarah Ahmed',
    outlet: 'Swahili Plates',
    rating: 4,
    comment: 'Love the coconut rice and fish curry. Authentic coastal flavors.',
    date: '2024-01-14'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    outlet: 'Burger Bros',
    rating: 4,
    comment: 'Quick service and tasty burgers. Great for a fast lunch.',
    date: '2024-01-13'
  },
  {
    id: '4',
    customerName: 'Priya Patel',
    outlet: 'Sushi Spot',
    rating: 5,
    comment: 'Fresh sushi and excellent presentation. Will definitely come back!',
    date: '2024-01-12'
  }
];



export const popularDishes = [
  {
    id: 1,
    name: 'Beef Burger',
    outlet: 'Burger Palace',
    price: 750,
  },
  {
    id: 2,
    name: 'Spicy Chicken Wings',
    outlet: 'Wing World',
    price: 600,
  },
  {
    id: 3,
    name: 'Veggie Pizza',
    outlet: 'Pizza Haven',
    price: 950,
  },

];
