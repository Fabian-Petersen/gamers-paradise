// import type { ImageResults } from "@/models/Images";
// import { ImagesSchemaWithPhotos } from "@/models/Images";
// import env from "./env";

// export default async function fetchImages(
//   url: string
// ): Promise<ImageResults | undefined> {
//   try {
//     const response = await fetch(url, {
//       headers: {
//         Authorization: env.PEXELS_API_KEY,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to Load Images\n");
//     }

//     const ImagesResults = await response.json();
//     // console.log(ImagesResults);

//     // $ Validate the data with the zod schema
//     const parsedData = ImagesSchemaWithPhotos.parse(ImagesResults);

//     if (parsedData.total_results === 0) return undefined;

//     return parsedData;
//   } catch (error) {
//     console.log(error);

//     if (error instanceof Error) {
//       console.error(error.stack);
//     }
//     throw error;
//   }
//   // $ Validate the data with the schema
// }
