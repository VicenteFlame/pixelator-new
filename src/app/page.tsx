import Head from "next/head";
import GitHubLogo from "./components/Github";
import ImagePixelator from "./components/ImagePixelator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Free Image Pixelator Online</title>
        <meta name="description" content="Create pixelated images fast and free." />
        <meta name="keywords" content="pixel art, editor de imágenes, convertir imágenes, pixelador" />
        <meta name="author" content="Vicente Muñoz" />

        {/* Open Graph para compartir en redes sociales */}
        <meta property="og:title" content="Create pixelated images fast and free." />
        <meta property="og:description" content="Pixelate images online fast and free." />
        <meta property="og:image" content="https://image-pixelator.com/examples/preview.png" />
        <meta property="og:url" content="https://www.image-pixelator.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ImagePixelator />
        <GitHubLogo />
      </main>
    </>
  );
}
