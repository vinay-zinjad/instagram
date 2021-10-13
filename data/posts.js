import { USERS } from './users'

export const POSTS = [
    {
        id: "1",
        imageUrl: "https://source.unsplash.com/cssvEZacHvQ/1080x1350",
        user: USERS[0].user,
        likes: 7888,
        caption: "what a wonderful day, I'm having great fun here. how is your day going. this image took a lot of strugling. I really like how it turned out ",
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'bendon',
                comment: "I totally agree on your thought. It was really a wonderful day"
            },
            {
                user: 'josep',
                comment: "could not agree more"
            },
        ]
    },
    {
        id: "2",
        imageUrl: "https://source.unsplash.com/oR0uERTVyD0/1080x1350",
        user: USERS[1].user,
        likes: 7888,
        caption: "what a wonderful day",
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'bendon',
                comment: "I totally agree on your thought. It was really a wonderful day"
            },

        ]
    },
    {
        id: "3",
        imageUrl: "https://source.unsplash.com/dO2WTawCTC4/1080x1350",
        user: USERS[5].user,
        likes: 888,
        caption: "Happy bithday my friend",
        profile_picture: USERS[5].image,
        comments: [
            {
                user: 'bendon',
                comment: "I totally agree on your thought. It was really a wonderful day"
            },
            {
                user: 'josep',
                comment: "could not agree more"
            },
        ]
    },
    {
        id: "4",
        imageUrl: "https://source.unsplash.com/lpjb_UMOyx8/1080x1350",
        user: USERS[6].user,
        likes: 7888,
        caption: "light will be there after dark.",
        profile_picture: USERS[6].image,
        comments: [

        ]
    },
]