import { PlacesClient } from "@googlemaps/places";
import dotenv from "dotenv";

// Загружаем переменные окружения из .env файла
dotenv.config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Инициализируем клиент с API ключом
const placesClient = new PlacesClient({
  apiKey: API_KEY,
});

export async function searchResponse(textQuery, maxResultCount) {
  const request = {
    textQuery,
    fields: ["displayName", "location", "businessStatus"],
    // languageCode: 'ru',
    maxResultCount: maxResultCount || 10,
  };

  const { response } = await placesClient.searchText(request, {
    otherArgs: {
      headers: {
        "X-Goog-FieldMask": "places.displayName",
      },
    },
  });
  if (response.length) {
    console.log(response);
    response.forEach((place) => {
      console.log(place);
    });
  }
}

searchResponse("попить кофе в Полтаве", 2);
