import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "w-full rounded-[var(--radius-control)] border border-border/70 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground [transition-property:border-color,box-shadow,background-color] duration-150 ease-out focus:border-foreground/20 focus:bg-background focus:outline-none focus:ring-4 focus:ring-foreground/5",
                className,
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";
export { Input };
