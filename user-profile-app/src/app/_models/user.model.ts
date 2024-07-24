export class User {
    id: number;
    name: string;
    socialMediaHandle: string;
    profileImgSrc: string;
    bio: string;
    location: string;
    website: string;

    constructor(
        id: number,
        name: string,
        socialMediaHandle: string,
        profileImgSrc: string,
        bio: string,
        location: string,
        website: string
      ) {
        this.id = id;
        this.name = name;
        this.socialMediaHandle = socialMediaHandle;
        this.profileImgSrc = profileImgSrc;
        this.bio = bio;
        this.location = location;
        this.website = website;
      }
    }
