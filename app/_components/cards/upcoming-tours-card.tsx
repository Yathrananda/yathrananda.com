import Image from "next/image";
import { MessageCircle, Calendar, MapPin, User, Clock, Plane, Train } from "lucide-react";

export default function TravelCard({
  data,
}: {
  data: {
    id: string;
    title?: string;
    location?: string;
    duration?: string;
    price?: string | number;
    image_url?: string;
    hero_image_alt?: string;
    description?: string;
    departure_date?: string;
    departure_place?: string;
    departure_type?: string;
  };
}) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden h-[520px] flex flex-col">
      <div className="relative flex-shrink-0">
        <Image
          src={data.image_url || "/placeholder.jpg"}
          alt={data.hero_image_alt || data.title || "Travel package"}
          width={400}
          height={320}
          className="w-full h-80 object-cover"
        />

        {typeof data.price !== "undefined" && (
          <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
            <div className="text-xl font-bold text-gray-900">
              ₹{" "}
              {typeof data.price === "number"
                ? data.price.toLocaleString("en-IN")
                : data.price}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mt-1">
              <User className="w-3 h-3" />
              <span>per person</span>
            </div>
          </div>
        )}

        {data.departure_date && (
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center text-white text-xs font-medium">
              <Calendar className="w-3 h-3 mr-1" />
              Departing{" "}
              {new Date(data.departure_date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">
            {data.title || "Travel Package"}
          </h3>

          <div className="space-y-2">
            {data.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span className="line-clamp-1">{data.location}</span>
              </div>
            )}

            {data.duration && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>{data.duration}</span>
              </div>
            )}

            {data.departure_place && data.departure_type ? (
              <div className="flex items-center text-sm text-muted-foreground">
                {data.departure_type === "plane" ? (
                  <Plane className="w-4 h-4 mr-2 text-primary" />
                ) : (
                  <Train className="w-4 h-4 mr-2 text-primary" />
                )}
                <span>Departing from {data.departure_place}</span>
              </div>
            ) : (
              <div className="flex items-center text-sm text-muted-foreground">
                --------------------------
              </div>
            )}
          </div>
        </div>

        {/* Action buttons - always at bottom */}
        <div className="flex gap-2 text-xs mt-auto">
          <button className="flex-1 bg-primary hover:bg-primary-hover text-white font-medium px-3 py-2 rounded-sm transition-colors border border-primary">
            Know More
          </button>
          <button className="flex-1 border border-primary text-primary hover:bg-muted font-medium px-3 py-2 rounded-sm transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
