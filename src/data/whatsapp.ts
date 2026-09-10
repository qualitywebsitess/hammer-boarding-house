import { site } from './site';

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: "Hi, I'd like to know more about Hammer Boarding House.",
  availability: "Hi, I'd like to check current room availability at Hammer Boarding House.",
  booking:
    "Hi, I'd like to book a room at Hammer Boarding House. My name is ___ and my WhatsApp number is ___.",
} as const;

export type WhatsAppVariant = keyof typeof whatsappMessages;

export const whatsappLinks: Record<WhatsAppVariant, string> = {
  general: buildWhatsAppLink(whatsappMessages.general),
  availability: buildWhatsAppLink(whatsappMessages.availability),
  booking: buildWhatsAppLink(whatsappMessages.booking),
};
