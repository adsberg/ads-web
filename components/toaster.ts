import { IToaster, Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster: IToaster =
  typeof document === "undefined"
    ? (null as never)
    : Toaster.create({
        className: "app-toaster",
        position: Position.TOP
      });
