import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>
>(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          "text-[10px] font-bold uppercase tracking-[0.25em]",
          error ? "text-red-400" : "text-neutral-500"
        )}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={clsx(
          "focus-visible:border-1 w-20 rounded-md border p-3 font-bold caret-purple-600 focus-visible:border-purple-600 focus-visible:outline-0 sm:w-28",
          error && "border-red-400 focus-visible:border-red-400"
        )}
        name={label}
        id={label}
        ref={ref}
        {...rest}
      />
      {error && <span className="text-[9px] italic text-red-400">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";
