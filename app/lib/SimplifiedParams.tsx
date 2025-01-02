// types.ts
type Category = {
  id: string;
  name: string;
};

// SimpleSidebar.tsx
("use client");
import Link from "next/link";

const SimpleSidebar = () => {
  // Sample categories
  const categories: Category[] = [
    { id: "1", name: "Games" },
    { id: "2", name: "Platforms" },
    { id: "3", name: "Developers" },
  ];

  return (
    <aside className="w-64 p-4 border-r">
      {/* Default "All" link */}
      <Link href="/" className="block p-2 hover:bg-gray-100 rounded">
        All Items
      </Link>

      {/* Category links that add search params */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.id}`}
          className="block p-2 hover:bg-gray-100 rounded"
        >
          {category.name}
        </Link>
      ))}
    </aside>
  );
};

// MainContent.tsx
("use client");
import { useSearchParams } from "next/navigation";

const MainContent = () => {
  // Get the current category from search params
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  // Render different content based on category
  const renderContent = () => {
    switch (currentCategory) {
      case "1":
        return <GamesContent />;
      case "2":
        return <PlatformsContent />;
      case "3":
        return <DevelopersContent />;
      default:
        return <AllContent />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
};

// Content components
const AllContent = () => <div>All Items Content</div>;
const GamesContent = () => <div>Games Content</div>;
const PlatformsContent = () => <div>Platforms Content</div>;
const DevelopersContent = () => <div>Developers Content</div>;

// page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen">
      <SimpleSidebar />
      <MainContent />
    </main>
  );
}
