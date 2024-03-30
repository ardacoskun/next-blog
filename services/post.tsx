import { cache } from "react";
import directus from "@/lib/directus";

export const getData = cache(async (slug: string, locale: string) => {
  try {
    const res = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = res?.data?.[0];

    if (locale === "en") {
      return postData;
    }

    const localisedRes = {
      ...postData,
      title: postData?.translations?.[0]?.title,
      description: postData?.translations?.[0]?.description,
      body: postData?.translations?.[0]?.body,
      category: {
        ...postData?.category,
        title: postData?.category?.translations?.[0]?.title,
      },
    };

    return localisedRes;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching post!");
  }
});
