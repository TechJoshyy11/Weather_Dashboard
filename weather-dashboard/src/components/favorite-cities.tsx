import { Loader2, X } from "lucide-react";
import { useFavorite } from "../hooks/use-favorites";
import { useWeatherQuery } from "../hooks/use-weather";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const favoriteCities = () => {
  const { favorites, clearFavorite } = useFavorite();
  if (!favorites.length) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 28 },
        }}
        className="pb-10"
      >
        {favorites.map((city) => {
          return (
            <SwiperSlide key={city.id}>
              <FavoriteCityTablet
                {...city}
                onRemove={() => clearFavorite.mutate(city.id)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex min-w-62.5 cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        variant={"ghost"}
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Remove ${name} from Favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default favoriteCities;
