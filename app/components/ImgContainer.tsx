"use client";

// import Image from "next/image";
// import type { Photo } from "@/models/Images";
// import { useGlobalContext } from "../lib/useAppContext";
// import { useRouter } from "next/navigation";

// // $ Use the linter tool to get the sizes values for the Image component
// // $ https://nextjs.org/docs/api-reference/next/image#layout
// // $ see https://ausi.github.io/respimagelint/ for more info.
// // $ Bookmark the lint images and open the bookmark with your app displayed. Copy the try this code snippet.
// // $ The image will be stored in the localStorage when user clicks on it, so that when user refreshes the page,
// // $ the image will still be available

// type ImageProps = {
//   photo: Photo;
// };

// const ImgContainer: React.FC<ImageProps> = ({ photo }: ImageProps) => {
//   const context = useGlobalContext();
//   const router = useRouter();

//   if (!context) return null;

//   const { setSelectedImage } = context;

//   const handleClick = () => {
//     setSelectedImage(photo);
//     // $ navigate to the single photo page by using the image id and the router
//     router.push(`/${photo.id}`);
//     // $ store photo in local storage if user refreshes the page
//     localStorage.setItem("selectedImage", JSON.stringify(photo));
//     // $ Add a class of hidden to the navbar when user clicks on the image
//     const navbar = document.getElementById("navbar");
//     navbar?.classList.add("invisible");
//   };

//   return (
//     <div className="relative overflow-hidden h-64 rounded-xl group">
//       <Image
//         src={photo.src.large}
//         alt={photo.alt}
//         fill={true}
//         priority={true}
//         onClick={handleClick}
//         objectFit="cover"
//         className="group-hover:cursor-pointer group-hover:opacity-75"
//         sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
//       />
//     </div>
//   );
// };

// export default ImgContainer;
