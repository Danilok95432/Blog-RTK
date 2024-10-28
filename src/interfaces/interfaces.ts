export interface Post {
  id: number;
  title: string;
  body: string; 
  userId: number;
  views: number;
  reactions: { [key: string]: number };
  tags: string[]; 
}

export interface Comment {
  body: string;
  id: number;
  likes: number;
  dislikes: number;
  postId: number;
  user: { id: number; username: string; fullName: string };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

export interface Reaction {
  like: boolean;
  dislike: boolean;
  postId: number | null;
  commentId: number | null;
}

export interface AddReactionPayload {
  postId?: number;
  commentId?: number;
  reactionType: "like" | "dislike";
}

export interface PostCardProps {
  post: Post;
}

export interface CommentCardProps {
  comment: Comment;
}

export interface CommentForm {
  comment: string;
}
