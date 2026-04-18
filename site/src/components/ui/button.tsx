import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-180 ease-outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-3xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold border-0 hover:bg-[#8E725D] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-[#6D5740] active:opacity-90",
        secondary:
          "rounded-3xl bg-secondary text-secondary-foreground px-6 py-2.5 text-sm font-normal border-0 hover:bg-[#e5ddd3] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        outline:
          "rounded-3xl bg-transparent text-primary border border-primary px-5 py-2.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-[background,color] duration-150",
        destructive:
          "rounded-3xl bg-destructive/10 text-destructive border border-destructive hover:bg-destructive/20 focus-visible:border-destructive/40",
        ghost: "rounded-3xl bg-transparent text-foreground hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline hover:text-[#8E725D]",
      },
      size: {
        default: "h-10 gap-1.5",
        sm: "h-8 gap-1 px-4 text-xs",
        lg: "h-11 gap-1.5 px-8 text-base",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
