import { Text } from "@react-email/components";
import { JOIN_URL } from "@/lib/data/links";
import { EmailButton, EmailLayout } from "./layout";
import { bodyText, reassuranceText } from "./styles";

export function WelcomeTemplate({ baseUrl }: { baseUrl: string }) {
  return (
    <EmailLayout
      baseUrl={baseUrl}
      preview="You're subscribed to The Dispatch."
      title="You're in"
    >
      <Text className="body-text" style={bodyText}>
        Your email is confirmed and you&apos;re subscribed to The Dispatch.
        We&apos;ll send you a short email when something new happens in
        Codetopia Community. Not a member yet? Here&apos;s how to join.
      </Text>

      <EmailButton href={`${baseUrl}${JOIN_URL}`}>
        Join the community
      </EmailButton>

      <Text
        className="reassurance"
        style={{ ...reassuranceText, margin: "0 0 24px 0" }}
      >
        Changed your mind? Every issue of The Dispatch has an unsubscribe link.
      </Text>
    </EmailLayout>
  );
}
