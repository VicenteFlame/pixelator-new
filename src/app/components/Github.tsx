import { Github } from 'lucide-react'

const GitHubLogo = () => {
  return (
    <a
      href="https://github.com/VicenteFlame/pixelator-new"
      target="_blank"
      rel="noopener noreferrer"
      className="bottom-6 right-6 p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                 shadow-inner hover:bg-violet-100 dark:hover:bg-violet-900 
                 transition-colors dark:text-gray-400 
                 hover:text-violet-600 dark:hover:text-violet-400 
                 transition-colors"
      aria-label="View source on GitHub"
    >
      <Github className="w-6 h-6" />
    </a>
  )
}

export default GitHubLogo