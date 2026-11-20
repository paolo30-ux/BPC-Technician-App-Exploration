import type { ServiceLine } from '@/types/domain';
import { formatPrice } from '@/utils/format';
import './ServicesTable.css';

/** Figma: "Table" (Services · Unit · Regular · Discounted). */
export function ServicesTable({
  lines,
  caption,
}: {
  lines: ServiceLine[];
  caption: string;
}) {
  return (
    <div className="services-table">
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Services</th>
            <th scope="col">Unit</th>
            <th scope="col">Regular</th>
            <th scope="col">Discounted</th>
          </tr>
        </thead>
        <tbody>
          {lines.length === 0 ? (
            <tr>
              <td colSpan={4} className="services-table__empty">
                No services
              </td>
            </tr>
          ) : (
            lines.map((line) => (
              <tr key={`${line.service}-${line.unit}`}>
                <td>{line.service}</td>
                <td>{line.unit}</td>
                <td>{formatPrice(line.regularPrice)}</td>
                <td>{formatPrice(line.discountedPrice)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
