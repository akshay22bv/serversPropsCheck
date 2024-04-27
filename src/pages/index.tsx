import { client } from "@/utils/sanity/client";
import Image from "next/image";
import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { GetServerSideProps } from "next";

type Props = {
  posts: Post[];
  users: User[];
};

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source?.asset?._ref);
}
const Home = ({ posts, users }: Props) => {
  return (
    <div>
      <div>
        {users?.map((item, key) => (
          <p key={key}>{item?.email}</p>
        ))}
      </div>
      <Image
        src={urlFor(posts[1]?.image).url()}
        width={100}
        height={100}
        alt=""
      />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts: Post[] = await client.fetch<Post[]>(`*[_type == "author"]`);

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  //
  // *[_type == "author" && defined(slug.current)]{_id, title, slug, publishedAt, mainImage, "categories": categories[]->{
  //   _id,
  //   title
  // }}|order(publishedAt desc)`);
  //
  // Extracting category titles from posts
  // const allCategoryTitles = posts.reduce<string[]>((acc, post) => {
  //   post.categories?.forEach((category) => {
  //     if (category.title && !acc.includes(category.title)) {
  //       acc.push(category.title);
  //     }
  //   });
  //   return acc;
  // }, []);

  return {
    props: {
      users,
      posts,
    },
  };
};
