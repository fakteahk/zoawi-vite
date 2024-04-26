function AboutCard() {
  return (
    <div className="max-w-lg mx-auto bg-zorini rounded-xl shadow-lg overflow-hidden sm:max-w-2xl">
      <div className="sm:flex">
        <div className="sm:shrink-0">
          <img
            className="h-48 w-full object-cover sm:h-full sm:w-64"
            src="/about.jpg"
            alt="Zorini and Faktea"
          />
        </div>
        <div className="p-3 sm:flex sm:flex-col sm:items-center sm:justify-center sm:w-full">
          <div className="uppercase tracking-wide text-sm text-primary/90  font-bold">
            Faktea Hk and Zorini C.
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-primary">
            Founding members of Zoawi Lyrics
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
