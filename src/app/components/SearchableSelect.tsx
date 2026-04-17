import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "./ui/utils";

export type SearchableSelectOption = {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
};

type SearchableSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  triggerClassName,
  contentClassName,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "inline-flex h-auto w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-slate-900 shadow-none transition-all outline-none hover:bg-white focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
            triggerClassName,
          )}
        >
          <span className="truncate">{selectedOption?.label ?? placeholder}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)} align="start">
        <Command filter={(itemValue, search, keywords) => {
          const haystack = [itemValue, ...(keywords ?? [])].join(" ").toLowerCase();
          return haystack.includes(search.toLowerCase()) ? 1 : 0;
        }}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                keywords={option.keywords}
                disabled={option.disabled}
                onSelect={() => {
                  if (option.disabled) {
                    return;
                  }

                  onChange(option.value);
                  setOpen(false);
                }}
                className="px-3 py-3"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="truncate">{option.label}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
