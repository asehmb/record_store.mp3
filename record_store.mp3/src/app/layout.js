
import "./globals.css";
import Header from "@/components/header/page";

export const metadata = {
  title: "record_store.mp3",
  description: "Share your music taste!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Header logged={false} ></Header>
        {children}
      </body>
    </html>
  );
}
