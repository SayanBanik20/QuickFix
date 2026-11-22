
export type Worker = {
  id: string;
  name: string;
  service: string;
  rating: number;
  jobs: number;
  price: number;
  experience: number;
  image: string;
};

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    service: 'Electrician',
    rating: 4.9,
    jobs: 142,
    price: 299,
    experience: 5,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Amit Sharma',
    service: 'Electrician',
    rating: 4.8,
    jobs: 98,
    price: 349,
    experience: 4,
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: '3',
    name: 'Suresh Das',
    service: 'Plumber',
    rating: 4.8,
    jobs: 115,
    price: 249,
    experience: 6,
    image: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: '4',
    name: 'Rahul Verma',
    service: 'Plumber',
    rating: 4.7,
    jobs: 87,
    price: 299,
    experience: 3,
    image: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: '5',
    name: 'Arjun Singh',
    service: 'Carpenter',
    rating: 4.9,
    jobs: 132,
    price: 399,
    experience: 7,
    image: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '6',
    name: 'Priya Singh',
    service: 'Cleaning',
    rating: 4.8,
    jobs: 98,
    price: 499,
    experience: 4,
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '7',
    name: 'Neha Sharma',
    service: 'Painting',
    rating: 4.7,
    jobs: 76,
    price: 599,
    experience: 5,
    image: 'https://i.pravatar.cc/150?img=44',
  },
  {
    id: '8',
    name: 'Vikram Das',
    service: 'Appliance',
    rating: 4.9,
    jobs: 156,
    price: 349,
    experience: 8,
    image: 'https://i.pravatar.cc/150?img=68',
  },
];
