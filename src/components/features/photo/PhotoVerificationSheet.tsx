import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/base/button/Button';
import { BottomSheet } from '@/components/shared/bottomsheet/BottomSheet';
import { ACCEPTED_PHOTO_TYPES, validatePhoto } from './photoValidation';
import { PhotoUploadArea } from './PhotoUploadArea';
import './PhotoVerificationSheet.css';

/**
 * Figma: "Photo Verification Overlay" (frames 9001:263117 empty,
 * 9001:263134 selected). Uses the browser's local file picker only — nothing
 * is uploaded. On phones the picker offers camera or photo library.
 */
export interface PhotoVerificationSheetProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

export function PhotoVerificationSheet({
  show,
  onCancel,
  onConfirm,
}: PhotoVerificationSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : undefined),
    [file],
  );
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  // Start fresh each time the sheet opens.
  useEffect(() => {
    if (show) {
      setFile(null);
      setError(null);
    }
  }, [show]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = ''; // allow re-selecting the same file
    if (!selected) return;
    const problem = validatePhoto(selected);
    setError(problem);
    setFile(problem ? null : selected);
  };

  return (
    <BottomSheet
      show={show}
      onHide={onCancel}
      title="Photo Verification"
      subtitle="A photo is required to verify before the service can begin."
      footer={
        <>
          <Button
            intent="primary"
            disabled={!file}
            onClick={() => file && onConfirm(file)}
          >
            Confirm
          </Button>
          <Button intent="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </>
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_PHOTO_TYPES.join(',')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        data-testid="photo-input"
        onChange={handleChange}
      />
      <PhotoUploadArea
        photoUrl={previewUrl}
        label={file ? `Change photo (${file.name})` : 'Choose a photo'}
        onActivate={() => inputRef.current?.click()}
      />
      {error && (
        <p className="photo-sheet__error" role="alert">
          {error}
        </p>
      )}
    </BottomSheet>
  );
}
