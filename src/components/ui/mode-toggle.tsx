import { useColorMode } from "@kobalte/core"
import Laptop from "lucide-solid/icons/laptop"
import Moon from "lucide-solid/icons/moon"
import Sun from "lucide-solid/icons/sun"
 
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
 
export function ModeToggle() {
  const { setColorMode } = useColorMode()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button<"button">} variant="ghost" size="sm" class="w-9 px-0">
        <Sun class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setColorMode("light")}>
          <Sun class="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("dark")}>
          <Moon class="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("system")}>
          <Laptop class="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
