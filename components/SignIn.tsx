
import { Button } from "./ui/button"
import { handleSignIn } from "@/actions/auth"


export function SignIn() {
  return (
    <form
      action={() => {
        handleSignIn("google")
      }}
    >
    <Button variant='link'>Sign In</Button>
    </form>
  )
} 