function ArtistCard({ children, imgSrc, ...props}) {
    return (
        <div {...props} className="relative h-48 max-h-48 sm:h-48 overflow-hidden rounded-2xl shadow-lg group">
            {imgSrc ? (
                <img src={imgSrc} alt="/" className="transition-transform group-hover:scale-110 duration-200" />
            ) : (
                <div className="transition-transform group-hover:scale-110 duration-200 bg-gray-200" style={{width: '100%', paddingTop: '100%'}}></div>
            )}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-4 text-white">{children}</div>
            </div>
        </div>
    )
}

export default ArtistCard
