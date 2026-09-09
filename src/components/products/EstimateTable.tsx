import { Fragment } from "react";
import type { Category, Product } from "../../types/database";
import { CategoryDividerRow } from "./CategoryDividerRow";
import { ProductRow } from "./ProductRow";

interface EstimateTableProps {
  groups: { category: Category; products: Product[] }[];
  getQuantity: (productId: string) => number;
  onQuantityChange: (product: Product, categoryName: string, quantity: number) => void;
}

const COLUMNS = [
  { label: "S.No", width: "7%" },
  { label: "Image", width: "11%" },
  { label: "Product Name", width: "50%" },
  { label: "Price (Rs)", width: "9%" },
  { label: "Quantity", width: "13%" },
  { label: "Total", width: "10%" },
];

export function EstimateTable({ groups, getQuantity, onQuantityChange }: EstimateTableProps) {
  let serial = 0;

  return (
    <div className="overflow-x-auto rounded-[4px] shadow-card">
      <table className="w-full min-w-[860px] table-fixed border-collapse bg-white">
        <colgroup>
          {COLUMNS.map((col) => (
            <col key={col.label} style={{ width: col.width }} />
          ))}
        </colgroup>
        <thead>
          <tr className="bg-red">
            {COLUMNS.map((col) => (
              <th
                key={col.label}
                className="border border-black px-2 py-4 text-sm font-bold text-white sm:py-5 sm:text-[17px] lg:text-[18px]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="border border-black bg-white p-10 text-center text-text-muted">
                No products match your search.
              </td>
            </tr>
          )}
          {groups.map(({ category, products }) => (
            <Fragment key={category.id}>
              <CategoryDividerRow name={category.name} colSpan={COLUMNS.length} />
              {products.map((product) => {
                serial += 1;
                return (
                  <ProductRow
                    key={product.id}
                    product={product}
                    serialNo={serial}
                    quantity={getQuantity(product.id)}
                    onQuantityChange={(qty) => onQuantityChange(product, category.name, qty)}
                  />
                );
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
