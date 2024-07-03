import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TodoContextProvider } from "@/context/TodoListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List App | Mj Hidalgo",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto`}>
        <TodoContextProvider>
          <Navbar />
          {children}
        </TodoContextProvider>
      </body>
    </html>
  );
}
