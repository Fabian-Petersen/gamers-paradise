// "use client";

// import Image from "next/image";
// import { useGlobalContext } from "../lib/useAppContext";
// import { FaCircleArrowLeft } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
// import Icon from "./Icon";
// import { Tooltip } from "flowbite-react";
// import { initFlowbite } from "flowbite";
// import { useEffect } from "react";

// const SinglePhoto = () => {
//   // $ Initialise the flowbite library to enable the dropdown menu in the navbar to open and close.
//   useEffect(() => {
//     initFlowbite();
//   }, []);

//   const { setSelectedImage: selectImageFromContext } = useGlobalContext() || {};
//   // $ check if selectedImage is available in the localStorage, once user click on image it is stored in the localStorage
//   // $ if it is, use it else get the image from the context
//   const selectedImageFromLocalStorage = localStorage.getItem("selectedImage");
//   const selectedImage = selectedImageFromLocalStorage
//     ? JSON.parse(selectedImageFromLocalStorage)
//     : selectImageFromContext;

//   const router = useRouter();

//   if (!selectedImage) {
//     // $ Handle the case when selectedImage is not available yet
//     return <div>Loading Images...</div>;
//   }

//   const handleClick = () => {
//     router.push("/");
//     // remove the class of hidden from the navbar when user clicks on the home icon
//     const navbar = document.getElementById("navbar");
//     navbar?.classList.remove("invisible");
//   };
//   //   <Tooltip content="Light Theme" placement="bottom">
//   //   <Icon icon={FaSun} handleClick={handleClick} className="text-white" />
//   // </Tooltip>
//   return (
//     <div className="relative w-screen h-screen top-0 left-0 mx-auto dark:bg-gray-900 border-none">
//       <Tooltip content="Back" placement="right">
//         <Icon
//           icon={FaCircleArrowLeft}
//           handleClick={handleClick}
//           className="absolute right-[5%] top-[5%] w-10 h-10 z-[1000] hover:cursor-pointer dark:text-white"
//         />
//       </Tooltip>
//       <Image
//         src={selectedImage.src.original}
//         alt={selectedImage.alt}
//         fill={true}
//         objectFit="contain"
//       />
//     </div>
//   );
// };

// export default SinglePhoto;
