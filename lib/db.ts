import { PrismaClient } from "./generated/prisma";

const db = new PrismaClient();

export default db;

// async function truncate() {
//   await db.tweet.deleteMany();
//   await db.like.deleteMany();
// }

// truncate();

// async function createUser(username: string) {
//   const user = await db.user.create({
//     data: {
//       username: username,
//       email: username + "@jenyj.com",
//     },
//   });
//   console.log(user);
// }

// createUser("jenyj");

// async function createTweet(tweetMessage: string) {
//   const tweet = await db.tweet.create({
//     data: {
//       content: tweetMessage,
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
//   console.log(tweet);
// }

// async function getTweet(tweetID: number) {
//   const tweet = await db.tweet.findUnique({
//     where: {
//       id: tweetID,
//     },
//     include: {
//       user: true,
//     },
//   });
//   console.log(tweet);
// }

// async function createLike() {
//   const like = await db.like.create({
//     data: {
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//       tweet: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
//   console.log(like);
// }

// async function getLike(likeID: number) {
//   const like = await db.like.findUnique({
//     where: {
//       id: likeID,
//     },
//     include: {
//       user: true,
//       tweet: true,
//     },
//   });
//   console.log(like);
// }

// async function deleteTweet() {
//   const tweet = await db.tweet.deleteMany();
//   console.log(tweet);
// }

// deleteTweet();
// lib/db.ts
