import { resend } from "@/lib/email";

function getSegmentId(): string {
  const id = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!id) {
    throw new Error(
      "RESEND_NEWSLETTER_SEGMENT_ID environment variable is not set",
    );
  }
  return id;
}

async function findContact(email: string) {
  const { data, error } = await resend.contacts.get({ email });
  if (error) {
    if (error.name === "not_found") return null;
    throw new Error(`Resend contact lookup failed: ${error.name}`);
  }
  return data;
}

async function isInSegment(email: string, segmentId: string): Promise<boolean> {
  const { data, error } = await resend.contacts.segments.list({ email });
  if (error) {
    throw new Error(`Resend segment lookup failed: ${error.name}`);
  }
  return data.data.some((segment) => segment.id === segmentId);
}

/** Whether this address already receives The Dispatch. */
export async function isSubscribed(email: string): Promise<boolean> {
  const contact = await findContact(email);
  if (!contact || contact.unsubscribed) return false;
  return isInSegment(email, getSegmentId());
}

/**
 * Puts a confirmed address on the list. Returns true when this changed
 * anything, so a second click on the same link doesn't send another welcome.
 */
export async function subscribeContact(email: string): Promise<boolean> {
  const segmentId = getSegmentId();
  const contact = await findContact(email);

  if (!contact) {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });
    if (error) throw new Error(`Resend contact create failed: ${error.name}`);
    return true;
  }

  const inSegment = await isInSegment(email, segmentId);
  if (!contact.unsubscribed && inSegment) return false;

  if (contact.unsubscribed) {
    const { error } = await resend.contacts.update({
      email,
      unsubscribed: false,
    });
    if (error) throw new Error(`Resend contact update failed: ${error.name}`);
  }

  if (!inSegment) {
    const { error } = await resend.contacts.segments.add({ email, segmentId });
    if (error) throw new Error(`Resend segment add failed: ${error.name}`);
  }

  return true;
}
