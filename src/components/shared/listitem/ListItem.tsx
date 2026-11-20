import type { ReactNode } from 'react';
import './ListItem.css';

/** Figma: "item" — title (Subtitle 2 Medium) + subtext, right action slot. */
export interface ListItemProps {
  title: ReactNode;
  subtext?: ReactNode;
  trailing?: ReactNode;
}

export function ListItem({ title, subtext, trailing }: ListItemProps) {
  return (
    <div className="list-item">
      <div className="list-item__text">
        <p className="list-item__title">{title}</p>
        {subtext && <p className="list-item__subtext">{subtext}</p>}
      </div>
      {trailing && <div className="list-item__trailing">{trailing}</div>}
    </div>
  );
}

/** Figma: "item-messages" — avatar, sender, one-line preview, time ago. */
export interface MessageListItemProps {
  avatarUrl: string;
  sender: string;
  preview: string;
  timeLabel: string;
}

export function MessageListItem({
  avatarUrl,
  sender,
  preview,
  timeLabel,
}: MessageListItemProps) {
  return (
    <div className="list-item list-item--message">
      <img className="list-item__avatar" src={avatarUrl} alt="" />
      <div className="list-item__text">
        <p className="list-item__sender">{sender}</p>
        <p className="list-item__preview">{preview}</p>
      </div>
      <span className="list-item__time">{timeLabel}</span>
    </div>
  );
}
