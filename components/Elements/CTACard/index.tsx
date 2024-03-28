/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { revalidateTag } from "next/cache";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";

const CTACard = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  const formAction = async (formData: FormData) => {
    "use server";
    try {
      const email = formData.get("email");
      await directus.items("subscribers").createOne({
        email,
      });
      revalidateTag("subscribers-count");
    } catch (error) {
      console.log("error");
      throw new Error("Error create subscriber!");
    }
  };

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
    {
      next: {
        tags: ["subscribers-count"],
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.meta.total_count)
    .catch((error) => console.log(error));

  return (
    <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
        alt="CTA Card Image"
        fill
        className="object-cover object-center"
      />
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="max-w-lg mt-2 text-lg">
          {dictionary.ctaCard.description}
        </p>
        <form
          key={subscribersCount + "subscribers-form"}
          action={formAction}
          className="flex items-center w-full gap-2 mt-6"
        >
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 text-base rounded-md outline-none bg-white/80 focus:ring-2 ring-neutral-600 placeholder:text-sm md:w-auto"
            placeholder={dictionary.ctaCard.placeholder}
          />
          <button className="px-3 py-2 transition-all rounded-md bg-neutral-900 text-neutral-200 hover:bg-neutral-500 whitespace-nowrap">
            {dictionary.ctaCard.button}
          </button>
        </form>

        <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscriberText1}{" "}
          <span className="px-2 py-1 text-sm rounded-md bg-neutral-700 text-neutral-100">
            {subscribersCount}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
