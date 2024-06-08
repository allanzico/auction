import Link from "next/link"
import { cn } from "@/lib/utils"
import { auth } from "@/auth"
import { SignOut } from "../SignOut"
import { SignIn } from "../SignIn"

const Navbar = async ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const session = await auth()
    return (
        <nav
          className={cn("flex p-5 items-center justify-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/bid"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            My Bids
          </Link>
          <Link
            href="/auction"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            create Auction
          </Link>
          <Link
            href="/lot"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            create Lot
          </Link>
          {
            session ? (
              <div
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <SignOut />
              </div>
            ) : (
              <div
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <SignIn />
              </div>
            )
          }

        </nav>
      )
}

export default Navbar