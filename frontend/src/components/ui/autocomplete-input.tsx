import * as React from "react";
import { cn } from "@/lib/utils";

export interface AutocompleteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suggestions: string[];
  onSuggestionSelect?: (value: string) => void;
}

export const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ suggestions, onSuggestionSelect, className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const [filtered, setFiltered] = React.useState<string[]>([]);
    const [highlight, setHighlight] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
      const val = e.target.value;
      if (val.length > 0) {
        const f = suggestions.filter(s => s.toLowerCase().includes(val.toLowerCase()));
        setFiltered(f);
        setShow(f.length > 0);
      } else {
        setShow(false);
        setFiltered([]);
      }
    };

    const handleSelect = (val: string) => {
      if (inputRef.current) inputRef.current.value = val;
      onSuggestionSelect?.(val);
      setShow(false);
    };

    return (
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          className={cn("flex h-11 w-full rounded-lg border border-input bg-card px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-primary/50 md:text-sm", className)}
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleChange}
        />
        {show && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
            {filtered.map((s, i) => (
              <li
                key={s}
                className={cn("px-4 py-2 cursor-pointer hover:bg-primary/10", i === highlight && "bg-primary/20")}
                onMouseDown={() => handleSelect(s)}
                onMouseEnter={() => setHighlight(i)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
AutocompleteInput.displayName = "AutocompleteInput";
