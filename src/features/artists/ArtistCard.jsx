function ArtistCard({ children, imgSrc, ...props }) {
  return (
    <div
      {...props}
      className=" cursor-pointer relative h-52 sm:h-60 overflow-hidden rounded-2xl shadow-lg group border-2 border-secondary border-dashed"
    >
      {imgSrc ? (
          <img
            src={imgSrc}
            alt="/"
            className="transition-transform group-hover:scale-110 duration-200 object-cover w-full h-full"
          />
      ) : (
        <div
          className="transition-transform group-hover:scale-110 duration-200 bg-gray-200  object-cover h-full w-full"
          style={{ width: "100%", paddingTop: "100%" }}
        ></div>
      )}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="p-4 uppercase text-white/70">{children}</div>
      </div>
    </div>
  );
}

export default ArtistCard;
