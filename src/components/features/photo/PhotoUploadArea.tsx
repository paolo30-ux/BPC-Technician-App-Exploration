import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/lib/icons';
import './PhotoUploadArea.css';

/**
 * Figma: "Image Upload Instructions" (empty) or the uploaded photo (filled,
 * frame 9001:263230). Always a button: it opens the Photo Verification sheet.
 */
export interface PhotoUploadAreaProps {
  photoUrl?: string;
  onActivate: () => void;
  /** Accessible name for the button. */
  label: string;
}

export function PhotoUploadArea({
  photoUrl,
  onActivate,
  label,
}: PhotoUploadAreaProps) {
  return (
    <button
      type="button"
      className={`photo-upload${photoUrl ? ' photo-upload--filled' : ''}`}
      onClick={onActivate}
      aria-label={label}
    >
      {photoUrl ? (
        <img className="photo-upload__image" src={photoUrl} alt="" />
      ) : (
        <span className="photo-upload__placeholder">
          <FontAwesomeIcon
            icon={icons.upload}
            className="photo-upload__icon"
            aria-hidden="true"
          />
          <span className="photo-upload__text">
            <span>Click to upload your file.</span>
            <span>JPG, PNG, SVG (Max 5 MB)</span>
          </span>
        </span>
      )}
    </button>
  );
}
