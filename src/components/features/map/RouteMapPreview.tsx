import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/lib/icons';
import mapImage from '@/assets/figma/map-route.png';
import currentMarker from '@/assets/figma/map-current.svg';
import routeLine from '@/assets/figma/map-route-line.svg';
import pinTail from '@/assets/figma/map-pin-tail.svg';
import './RouteMapPreview.css';

/**
 * Figma: "location-container" › Map + map-indicator. Static image for the
 * prototype (DD-13); the route overlay reproduces the Figma composition.
 */
export interface RouteMapPreviewProps {
  size: 'preview' | 'detail';
  travelTimeLabel: string;
  arrivalTimeLabel: string;
  /** Text alternative describing the route. */
  description: string;
}

export function RouteMapPreview({
  size,
  travelTimeLabel,
  arrivalTimeLabel,
  description,
}: RouteMapPreviewProps) {
  return (
    <figure className={`route-map route-map--${size}`}>
      <img className="route-map__image" src={mapImage} alt="" />
      <div className="route-map__indicator" aria-hidden="true">
        <span className="route-map__current">
          <img src={currentMarker} alt="" />
        </span>
        <span className="route-map__route">
          <img src={routeLine} alt="" />
          <span className="route-map__travel">{travelTimeLabel}</span>
        </span>
        <span className="route-map__truck">
          <FontAwesomeIcon icon={icons.location} />
        </span>
        <span className="route-map__pin">
          {arrivalTimeLabel}
          <img className="route-map__pin-tail" src={pinTail} alt="" />
        </span>
      </div>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
