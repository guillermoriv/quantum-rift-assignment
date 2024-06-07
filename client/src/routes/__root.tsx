import { Wallet } from "@/components/wallet/wallet";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex">
      <div className="w-1/4 h-screen p-2 flex flex-col justify-between gap-1 border-r">
        <div className="border p-4 text-center rounded-md">
          <Link to="/" className="[&.active]:font-bold">
            Quantum Rift Labs
          </Link>
        </div>
        <Wallet />
      </div>
      <div className="flex-1 flex p-2">
        <Outlet />
      </div>
    </div>
  ),
});
