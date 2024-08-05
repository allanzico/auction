
import { Button } from "./ui/button"
import { handleSignOut } from "@/actions/auth"

 
export function SignOut() {
  return (
    <form
      action={async () => {
     handleSignOut()
      }}
    >
     <Button variant='link' >Sign out</Button>
    </form>
  )
}