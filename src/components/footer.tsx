import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 px-6 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-sm text-muted-foreground">
            © 2025 Wookielink. All rights reserved.
          </span>
        </div>
        <nav className="flex space-x-4 text-sm">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
