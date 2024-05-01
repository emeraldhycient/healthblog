export interface CreateAccountData {
    email: string;
    password: string;
    username: string;
    fullname: string;
}
export interface LoginDTO {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

export interface ResetPasswordDTO {
  password1: string;
  password2: string;
}

export interface UserProfileDTO  {
  fullname: string;
  username: string;
  bio: string;
};

export interface Profile {

  data : {
    id: string
    fullname: string;
    username: string;
    isLoggedIn: boolean;
    profile: {
      bio: string
    }
    verification: {
      verified: boolean;
    }
    wallet: {
      balance: number;
    };
  }
  totalArticles: number;
  verification_status: string;
  hasFollowed?: boolean
}

export interface LicenseSubmissionDTO {
  durationStart: string;
  durationEnd: string;
  specialty: string;
  licenseType: string;
  licenseNumber: string;
  isOwner: boolean
}

export interface CreateArticleProps {
  content: string;
  category: string[];
  title: string;
}

export interface Author {
  username: string;
  fullname: string;
  profile: {
    avatar: {
      idx: string;
      secure_url: string;
      public_id: string;
      public_url: string;
    };
  };
}

export interface Followers {
  data: [
    {
        id: string | number;
        avatar: string;
        fullname: string;
        username: string;
    }
  ];
  followersLength: number;
  followingLength: string
}

export interface Following {
  data: [
   following: {
        id: string | number;
        profile: {
          avatar: {
            idx: string;
            secure_url: string;
            public_id: string;
            public_url: string;
          };
        };
        fullname: string;
        username: string;
    }
  ];
  followersLength: number;
  followingLength: string
}


export interface CoverPhoto {
  idx: string;
  secure_url: string;
  public_id: string;
  public_url: string;
}

export interface Article {
  content: string | undefined;

  id: string;
  title: string;
  categories: string[];
  author: Author;
  coverPhoto: CoverPhoto;
  data: {
    coverPhoto: CoverPhoto;
    id: string;
    content: string;
    categories: string[];
    views: number;
    title: string;
    readingTime: string;
    publishedAt: string;
    editAt: string;
    authorId: string;
    author: Author;
  }
  totalBookmarks: number;
  totalLikes: number;
}

export interface NewsFeed {
  id: string;
  title: string;
  views: number;
  content: string;
  categories: string[];
  coverPhoto: CoverPhoto;
  readingTime: string;
  publishedAt: string;
  author: Author;
}

export interface Plan {
  key: any;
  name: string;
  pricing?: {
    monthly: {
      amount: number;
    
      planKey: string;
    };
    quarterly: {
      amount: number;
    
      planKey: string;
    };
    semi_annually: {
      amount: number;
    
      planKey: string;
    };
    annually: {
      amount: number;
     
      planKey: string;
    };
  };
  benefits: string[];
}

export interface Comment {
  replies: any;
  user: {
    username: string
    fullname: string;
    id: string;
    profile: {
      avatar:{
        secure_url: string
      }
    }
  };
  commentedAt: string;
  content: string;
  id?: string;
  totalLikes?: number;
}

export type ArticleId = string | undefined;

export interface Bookmark {
  bookmarkedAt: string;
  article: {
    id: string;
    title: string;
    categories: string[];
    coverPhoto: {
      idx: string;
      secure_url: string;
      public_id: string;
      public_url: string;
    };
    readingTime: string;
    publishedAt: string;
    author: {
      username: string;
      fullname: string;
      profile: {
        avatar: {
          idx: string;
          secure_url: string;
          public_id: string;
          public_url: string;
        };
      };
    };
  };
}

export interface Advert {
  productName: string;
  keyword: string;
  description: string;
  action_link: string;
  productImage: string;
}

export interface ForumMsg {
  content: string;
  sender: {
    id: string;
    fullname: string;
    username: string;
  }
  alignment: string;
  createdAt: string;
}

export interface CreateForum {
  title: string;
  maxMembers: number | string | any;
  description: string;
  keyword: string[];
  profile_image: string
}

export interface Forum {
  id: string;
  title: string;
  maxMembers: number;
  unreadCount: number;
  description: string;
  profile_img: {
    secure_url: string
  }
  avatar: {
    secure_url: string
  }
}

export interface Job {
  name: string;
  actionLink: string;
  description: string;
}

export interface ForumRequesters {
  id: string;
  forumId: string;
  requestedAt: string;
  requesterId: string;
  status: string;
  forum: Forum;
  requester: {
    fullname: string;
  }
}

export interface Withdraw {
  amountToWithdraw: number
}

export interface Banks {
  id: string | number;
  slug: string;
  name: string;
  code: string;
  account_number: string
}

export interface AccountDetails {
  bankCode: string;
  accountNumber: string
  accountName: string
}

export interface becomeMember {
  duration: string;
  ref: string
  source: string
}