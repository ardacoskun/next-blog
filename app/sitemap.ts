import { MetadataRoute } from "next";
import directus from "@/lib/directus";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  //Get Posts
  const posts = await directus.items("post").readByQuery({
    fields: ["slug", "date_updated"],
  });

  const postLinks = posts?.data?.map((item) => {
    return [
      {
        url: `${baseUrl}/en/blog/${item.slug}`,
        lastModified: new Date(item.date_updated),
      },
      {
        url: `${baseUrl}/de/blog/${item.slug}`,
        lastModified: new Date(item.date_updated),
      },
      {
        url: `${baseUrl}/blog/${item.slug}`,
        lastModified: new Date(item.date_updated),
      },
    ];
  });

  //Get Categories
  const categories = await directus.items("category").readByQuery({
    fields: ["slug", "date_updated"],
  });

  const categoryLinks = categories?.data?.map((item) => {
    return [
      {
        url: `${baseUrl}/en/${item.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/de/${item.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/${item.slug}`,
        lastModified: new Date(),
      },
    ];
  });

  const dynamicLinks = postLinks?.concat(categoryLinks ?? []).flat() ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
    },
    ...dynamicLinks,
  ];
}
