import { cache } from "react";
import directus from "@/lib/directus";

export const getData = cache(async (category: string, locale: string) => {
  try {
    const res = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: category,
        },
      },
      fields: [
        "*",
        "translations.*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.author.title",
        "posts.translations.*",
      ],
    });

    const fetchedCategory = res?.data?.[0];

    if (locale === "en") {
      return fetchedCategory;
    }

    const localisedRes = {
      ...fetchedCategory,
      title: fetchedCategory?.translations[0].title,
      description: fetchedCategory?.translations[0].description,
      posts: fetchedCategory?.posts.map((item: any) => {
        return {
          ...item,
          title: item?.translations[0].title,
          description: item?.translations[0].description,
          body: item?.translations[0].body,
          category: {
            ...item.category,
            title: fetchedCategory?.translations[0].title,
          },
        };
      }),
    };

    return localisedRes;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching category!");
  }
});
