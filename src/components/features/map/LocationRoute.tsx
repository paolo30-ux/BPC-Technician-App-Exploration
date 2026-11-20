import currentIcon from '@/assets/figma/marker-current-location.svg';
import destinationIcon from '@/assets/figma/marker-destination.svg';
import type { GeoAddress } from '@/types/domain';
import './LocationRoute.css';

/** Figma: location-container › "location" (current → next, dashed connector). */
export function LocationRoute({
  from,
  to,
}: {
  from: GeoAddress;
  to: GeoAddress;
}) {
  return (
    <ol className="location-route" aria-label="Route">
      <li className="location-route__stop">
        <img className="location-route__marker" src={currentIcon} alt="" />
        <span className="location-route__text">
          <span className="location-route__address">{from.label}</span>
          <span className="location-route__caption">{from.caption}</span>
        </span>
      </li>
      <li className="location-route__stop">
        <img className="location-route__marker" src={destinationIcon} alt="" />
        <span className="location-route__text">
          <span className="location-route__address">{to.label}</span>
          <span className="location-route__caption">{to.caption}</span>
        </span>
      </li>
    </ol>
  );
}
