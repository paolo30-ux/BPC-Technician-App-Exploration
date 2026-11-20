import type { AppointmentNote } from '@/types/domain';
import './NotesList.css';

/** Figma: Notes accordion content — dated groups of bullet points. */
export function DatedNotes({ notes }: { notes: AppointmentNote[] }) {
  if (notes.length === 0) {
    return <p className="notes-list__empty">No notes for this appointment.</p>;
  }
  return (
    <div className="notes-list">
      {notes.map((group) => (
        <div key={group.date} className="notes-list__group">
          <p className="notes-list__date">{group.date}</p>
          <ul className="notes-list__items">
            {group.entries.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Figma: Site Verification Notes — plain bullet list. */
export function BulletNotes({ notes }: { notes: string[] }) {
  return (
    <ul className="notes-list__items">
      {notes.map((entry) => (
        <li key={entry}>{entry}</li>
      ))}
    </ul>
  );
}
