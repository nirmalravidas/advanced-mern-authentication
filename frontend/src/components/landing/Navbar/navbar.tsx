import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Navbar/logo";
import { NavMenu } from "@/components/landing/Navbar/nav-menu";
import { NavigationSheet } from "@/components/landing/Navbar/navigation-sheet";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { userStore } from "@/store/useUserStore";
import { User2Icon } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = userStore();

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Avatar Link (Visible) */}
              <Link to="/profile/update" className="hidden sm:inline-flex">
                <Avatar>
                  <AvatarImage src={undefined} />
                  <AvatarFallback className="p-2">
                    <User2Icon />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                onClick={logout}
                variant="outline"
                className="hidden sm:inline-flex"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="hidden sm:inline-flex">
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}

          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
