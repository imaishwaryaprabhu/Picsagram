export interface Post {
    _id: string;
    caption: string;
    imagePath: string;
    createdBy: {
        profileImage?: string
        username: string
    };
    likes: number;
    likedByUser: boolean;
    comments: [];
    public: boolean;
    createdDateTime: string;
    allowEdit: boolean;
}