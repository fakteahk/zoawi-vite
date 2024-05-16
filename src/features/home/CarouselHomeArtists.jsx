import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getArtistsForHomepage } from "@/db/apiArtists";

import catman from "/catman.svg";
import { useQuery } from "@tanstack/react-query";

export function CarouselHomeArtists() {
  const { isLoading, data: artist } = useQuery({
    queryKey: ["artist"],
    queryFn: getArtistsForHomepage,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="max-w-sm md:max-w-2xl mx-auto lg:max-w-4xl"
    >
      <CarouselContent className="-ml-0 md:-ml-[4.5rem] lg:-ml-32">
        {artist.map((artist, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 ml-4 md:ml-6 md:pl-24 lg:pl-32"
          >
            <div className="pl-2">
              <Card className="h-48 w-48 md:w-64 md:h-64 rounded-xl ">
                <CardContent className="relative flex aspect-square items-start justify-start -p-1 w-full h-full">
                  <img
                    src={artist.image_url || catman}
                    alt="description"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-start">
                    <div className="p-5 text-xl font-extrabold uppercase text-white/70">
                      <div>#{index + 1}</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-xl">
                    <div className="p-5 uppercase text-white/70">
                      {artist.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex items-center justify-center" />
      <CarouselNext className="hidden md:flex items-center justify-center" />
    </Carousel>
  );
}
