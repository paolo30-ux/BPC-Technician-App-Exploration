/**
 * Central icon registry. Every icon used by the app is imported here and only
 * here, so moving from Font Awesome Free to Pro (when a valid package token is
 * available) is a one-file change. See docs/design-decisions.md DD-10.
 *
 * Figma uses `fa-regular/*` for most UI icons. Where the regular style is not
 * in the free set, the solid style is used and marked "solid stand-in"; where
 * the exact glyph is Pro-only, the closest free glyph is used and marked
 * "substitute".
 */
import {
  faBell,
  faBuilding,
  faCalendar,
  faCircleCheck as faCircleCheckRegular,
  faCircleUser,
  faClock,
  faEnvelope,
  faHouse,
  faImage,
  faMessage,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faArrowUpFromBracket,
  faBoxOpen,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faCircleInfo,
  faClipboardList,
  faLocationArrow,
  faLocationDot,
  faLock,
  faPause,
  faPhone,
  faPlay,
  faStop,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

export const icons = {
  // Bottom navigation (Figma: Mobile Navigation Bar)
  navHome: faHouse, // fa-regular/house
  navInventory: faBoxOpen, // fa-regular/box-open — solid stand-in
  navSchedule: faCalendar, // fa-regular/calendar
  navAppointment: faClipboardList, // fa-regular/clipboard-list — solid stand-in
  navMessage: faMessage, // fa-regular/message

  // Header & timer (Figma: main-header, .timer)
  bell: faBell, // fa-regular/bell
  clock: faClock, // fa-regular/clock
  play: faPlay, // fa-solid/play
  pause: faPause, // fa-solid/pause
  stop: faStop, // fa-solid/stop
  back: faArrowLeft, // fa-regular/arrow-left — solid stand-in
  previous: faChevronLeft, // fa-regular/chevron-left — solid stand-in
  next: faChevronRight, // fa-regular/chevron-right — solid stand-in

  // Appointment details
  building: faBuilding, // fa-regular/buildings — substitute (buildings is Pro)
  contact: faCircleUser, // fa-regular/circle-user
  email: faEnvelope, // fa-regular/envelope
  address: faLocationDot, // fa-regular/pin — substitute (solid location-dot)
  phone: faPhone, // fa-regular/phone — solid stand-in
  stepDone: faCircleCheckRegular, // progress step: completed
  stepCurrent: faClock, // progress step: in progress
  stepLocked: faLock, // progress step: locked

  // Alerts & info
  alert: faCircleExclamation, // fa-solid/octagon-exclamation — substitute (Pro)
  info: faCircleInfo, // fa-regular/circle-info — solid stand-in

  // Site verification
  directions: faLocationDot, // fa-regular/location-dot — solid stand-in
  upload: faArrowUpFromBracket, // fa-regular/arrow-up-from-bracket — solid stand-in
  photo: faImage, // fa-regular/image (upload preview fallback)
  location: faLocationArrow, // fa-regular/location-arrow — solid stand-in

  // Lists, accordions, sheets
  chevronRight: faAngleRight, // fa-regular/angle-right — solid stand-in
  chevronDown: faAngleDown, // fa-regular/angle-down — solid stand-in
  close: faXmark, // fa-regular/xmark — solid stand-in
} as const;

export type IconName = keyof typeof icons;
