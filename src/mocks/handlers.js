import { rest } from "msw";

const baseURL = "https://greenthumb-back-4bd145d8f205.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
        ctx.json({
          id: 2,
          owner: "Froda",
          created_at: "18 Apr 2024",
          updated_at: "20 Apr 2024",
          name: "",
          content: "I have one vision: everything in my garden should be edible. My favorite plant is the tomato!",
          image: "https://res.cloudinary.com/dihkuau3v/image/upload/v1/media/../profile_default",
          is_owner: false,
          following_id: null,
          posts_count: 0,
          followers_count: 1,
          following_count: 1
          },)
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];