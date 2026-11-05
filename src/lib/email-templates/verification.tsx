import { Link, Text } from "@react-email/components";
import { bodyText, EmailButton, EmailLayout, reassuranceText } from "./layout";

export function VerificationTemplate({
  verifyUrl,
  baseUrl,
}: {
  verifyUrl: string;
  baseUrl: string;
}) {
  return (
    <EmailLayout
      baseUrl={baseUrl}
      preview="Confirm your email to start getting The Dispatch."
      title="Confirm your email"
    >
      <Text className="body-text" style={bodyText}>
        Click the button below to confirm your email and subscribe to The
        Dispatch, a short email when something new happens in Codetopia
        Community. This link expires in 24 hours.
      </Text>

      <EmailButton href={verifyUrl}>Confirm subscription</EmailButton>

      <Text className="reassurance" style={reassuranceText}>
        If you didn&apos;t request this email, there&apos;s nothing to worry
        about. You can safely ignore it.
      </Text>
      <Text
        className="reassurance"
        style={{
          ...reassuranceText,
          margin: "0 0 24px 0",
          wordBreak: "break-all",
        }}
      >
        Button not working? Open this link instead:{" "}
        <Link
          href={verifyUrl}
          style={{ color: "#71717a", textDecoration: "underline" }}
        >
          {verifyUrl}
        </Link>
      </Text>
    </EmailLayout>
  );
}
