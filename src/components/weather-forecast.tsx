import type { ForecastData } from "../api/type";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const weatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min,
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max,
        );
      }

      return acc;
    },
    {} as Record<string, DailyForecast>,
  );

  const nextDays = Object.values(dailyForecast).slice(1, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-1 gap-3 rounded-xl border bg-card/50 p-4 sm:grid-cols-3 sm:items-center sm:gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between sm:block">
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {format(new Date(day.date * 1000), "EEEE, MMM d")}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">
                    {day.weather.description}
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                  alt={day.weather.description}
                  className="h-10 w-10 object-contain sm:hidden"
                />
              </div>
              <div className="flex justify-start gap-3 sm:justify-center">
                <span className="flex items-center text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">
                  <ArrowDown className="mr-1 h-3.5 w-3.5" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-md">
                  <ArrowUp className="mr-1 h-3.5 w-3.5" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>
              <div className="flex items-center justify-start gap-4 border-t border-border/40 pt-2.5 sm:border-0 sm:pt-0 sm:justify-end text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-sky-500" />
                  <span className="text-xs font-medium">{day.wind} m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default weatherForecast;
