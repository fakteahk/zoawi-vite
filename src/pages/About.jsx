import AboutCard from "../ui/AboutCard";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-2xl mb-4 sm:items-center sm:text-center sm:justify-center">
        <p className="mb-4 font-bold">About Us!</p>
        <AboutCard />
      </div>
      <AboutText />
    </div>
  );
}

function AboutText() {
  return (
    <div className="px-1 pt-3 ">
      Zoawi Lyrics sprang to life in 2024, a brainchild of the dynamic duo,
      Faktea and Zorini! Armed with their tech wizardry and a dash of spicy
      sauce, they embarked on a mission to unleash the magic of Mizo lyrics for
      all to enjoy. Why, you ask? Well, picture this: a digital desert devoid of
      delightful interfaces and cutting-edge tech, leaving lyric lovers lost in
      a barren landscape of outdated platforms.
      <br />
      <br />
      Well damn, that sucks...
      <br />
      <br />
      As luck would have it, Faktea and Zorini couldn&apos;t abide such a
      tragedy! So, they donned their virtual capes and set forth to craft a
      sanctuary of song, where every click and tap would spark joy and wonder.
      <br />
      <br />
      And thus, Zoawi Lyrics was born, a beacon of quirky charm and modern
      marvels in the vast expanse of the internet. So come one, come all, and
      join the feline frenzy of lyric exploration!
    </div>
  );
}
