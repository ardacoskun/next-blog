/* eslint-disable react/no-unescaped-entities */
import directus from "@/lib/directus";
import Image from "next/image";

const CTACard = async () => {
  const formAction = async (formData: FormData) => {
    "use server";
    try {
      const email = formData.get("email");
      await directus.items("subscribers").createOne({
        email,
      });
    } catch (error) {
      console.log("error");
      throw new Error("Error create subscriber!");
    }
  };

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
          Explore the world with me!
        </h3>
        <p className="max-w-lg mt-2 text-lg">
          Explore the world with me! I'm travelling around the 🌍. I've visited
          most of the great cities of 🇺🇸 and currently I'm travelling in 🇪🇺 Join
          me!
        </p>
        <form
          action={formAction}
          className="flex items-center w-full gap-2 mt-6"
        >
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 text-base rounded-md outline-none bg-white/80 focus:ring-2 ring-neutral-600 placeholder:text-sm md:w-auto"
            placeholder="Write your email"
          />
          <button className="px-3 py-2 transition-all rounded-md bg-neutral-900 text-neutral-200 hover:bg-neutral-500 whitespace-nowrap">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
