import Head from "next/head";
import GitHubLogo from "./components/Github";
import ImagePixelator from "./components/ImagePixelator";

export default function Home() {
  const siteUrl = "https://www.image-pixelator.com/"; // Cambia esto a tu URL real
  const title = "Free Image Pixelator Online";
  const description = "Create pixelated images fast and free. Transform your images into pixel art with our easy-to-use online tool.";
  const previewImage = `${siteUrl}/examples/preview.png`;

  return (
    <>
      <Head>
        {/* Metadatos básicos */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="pixel art, image editor, convert images, pixelator, online pixelator, free pixelator, image to pixel art" />
        <meta name="author" content="Vicente Muñoz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Image Pixelator" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:alt" content="Image Pixelator Preview" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={previewImage} />
        <meta name="twitter:image:alt" content="Image Pixelator Preview" />

        {/* Otros metadatos útiles */}
        <meta name="theme-color" content="#8B5CF6" /> {/* Color morado */}
        <meta name="application-name" content="Image Pixelator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Image Pixelator" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ImagePixelator />
        <GitHubLogo />
      </main>
    </>
  );
}