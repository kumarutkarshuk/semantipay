import Link from "next/link"
import { Icons } from "@/components/icons"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-lg">
      <div className="container flex flex-col gap-10 py-16 mx-auto px-8 sm:px-0">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              {/* <Icons.logo className="h-6 w-6" /> */}
              <span className="font-heading text-xl tracking-tight">SemantiPay</span>
            </Link>
            <p className="text-muted-foreground max-w-sm opacity-70">
              An AI-driven payroll system that ensures seamless processing and full compliance across the globe.
            </p>
            <div className="flex gap-4">
              {/* <Link href="https://x.com/kumarukutkarsh" target="_blank" rel="noreferrer" className="glassmorphic-icon">
                <Icons.twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">Twitter</span>
              </Link> */}
              <Link href="https://github.com" target="_blank" rel="noreferrer" className="glassmorphic-icon">
                <Icons.gitHub className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">GitHub</span>
              </Link>
               {/* <Link href="https://www.linkedin.com/in/kumarutkarshuk/" target="_blank" rel="noreferrer" className="glassmorphic-icon">
                <Icons.linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </Link> */}
            </div>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium tracking-tight">Product</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium tracking-tight">Developer</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/kumarutkarshuk/"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
                    target="_blank" rel="noreferrer"
                  >
                    About Utkarsh
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground opacity-70">
            &copy; {new Date().getFullYear()} SemantiPay. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
            >
              Terms
            </Link>
            <Link
              href="#privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground opacity-70"
            >
              Privacy
            </Link>
          </div>
        </div> */}
      </div>
      <ScrollToTopButton />
    </footer>
  )
}
