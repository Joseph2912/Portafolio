import { cn } from "@/lib/utils";
import { LabelHTMLAttributes } from "react";

function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={cn("text-sm text-zinc-400 select-none", className)} {...props} />;
}

export { Label };
