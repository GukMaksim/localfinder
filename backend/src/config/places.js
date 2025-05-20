import { PlacesClient } from "@googlemaps/places";

// Ініціалізація клієнта Places API
const placesClient = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

// Функція для пошуку закладів
async function searchPlaces(query, maxResults = 5) {
  try {
    console.log("Пошук закладів:", { query, maxResults });
    console.log(
      "API Key:",
      process.env.GOOGLE_MAPS_API_KEY ? "Встановлено" : "Не встановлено"
    );

    // Формуємо запит
    const request = {
      textQuery: query,
      // fields: ["displayName", "location", "businessStatus"],
      languageCode: 'uk',
      maxResultCount: maxResults,
    };

    console.log("Запит до Places API:", JSON.stringify(request, null, 2));

    // Відправляємо запит з мінімальним набором полів
    const [response] = await placesClient.searchText(request, {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "places.displayName.text,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.currentOpeningHours.weekdayDescriptions",
        },
      },
    });

    console.log("Відповідь від Places API:", JSON.stringify(response, null, 2));

    if (!response || !response.places) {
      throw new Error("Неочікувана відповідь від Places API");
    }

    // Обробляємо результати
    const places = response.places.map((place) => ({
      name: place.displayName.text,
      address: place.formattedAddress,
      phone: place.nationalPhoneNumber,
      website: place.websiteUri,
      rating: place.rating,
      openingHours: place.currentOpeningHours.weekdayDescriptions,
      reviews: [],
    }));

    console.log("Оброблені результати:", JSON.stringify(places, null, 2));
    return places;
  } catch (error) {
    console.error("Помилка при пошуку закладів:", error);
    console.error("Stack trace:", error.stack);
    if (error.metadata) {
      console.error("Metadata:", error.metadata);
    }
    if (error.statusDetails) {
      console.error("Status Details:", error.statusDetails);
    }
    throw new Error(`Помилка при пошуку закладів: ${error.message}`);
  }
}

export { searchPlaces };
