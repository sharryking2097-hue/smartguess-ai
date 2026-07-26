import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "SmartGuess AI — Pakistan ka #1 AI Guess Paper Generator",
  description:
    "BISE Board students ke liye AI-powered guess papers. Class 9, 10, 11, 12 ke liye instant guess papers with probability scores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
