import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Only show on larger screens and fixed width */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:w-1/5 bg-gray-800">
        <Sidebar />
      </div>
      {/* Chat Component - Takes the remaining space and flex-grow */}
      <div className="flex-1 flex flex-col">
        <Chat />
      </div>
    </div>
  );
}
