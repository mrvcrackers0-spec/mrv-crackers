import { ArrowRight } from "lucide-react";

interface CategoryDividerRowProps {
  name: string;
  colSpan: number;
}

export function CategoryDividerRow({ name, colSpan }: CategoryDividerRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="border border-black bg-stripes-red p-0">
        <div className="flex h-[52px] items-center justify-center gap-2 sm:h-14">
          <span className="text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
            {name.toUpperCase()}
          </span>
          <ArrowRight size={18} className="text-gold-light" aria-hidden />
        </div>
      </td>
    </tr>
  );
}
