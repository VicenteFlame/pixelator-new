import GitHubLogo from "./components/Github";
import ImagePixelator from "./components/ImagePixelator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImagePixelator />
      <GitHubLogo />
    </main>
  );
}