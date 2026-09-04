import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { cloudinaryFill, getSpotlightByHandle } from "@/lib/spotlight";

export const runtime = "nodejs";
export const revalidate = 3600;

export const alt = "Codetopia Community Spotlight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card: the same object as the feature card on the home page.
 *
 * One photograph filling the frame, the name across the bottom of it, the
 * community mark on the same baseline. A link posted anywhere should look
 * like the site it came from, so this follows SpotlightCard at size "lg"
 * rather than inventing a second treatment for the same thing.
 *
 * Fonts are read from the repository rather than fetched at render time: a
 * share preview should not depend on a third party being reachable.
 */
// Each path is written out in full rather than built from parts. Turbopack
// traces these reads statically to decide what to ship with the route, and a
// path it cannot follow makes it bundle the entire project as a precaution.
const FONT_DISPLAY = path.join(
  process.cwd(),
  "src/assets/fonts/SpaceGrotesk-Bold.ttf",
);
const FONT_BODY = path.join(
  process.cwd(),
  "src/assets/fonts/Inter-SemiBold.ttf",
);
const LOGO = path.join(
  process.cwd(),
  "src/assets/images/logos/codetopia-community.png",
);

/** The name is the loudest thing on the card, so it sets its own size. */
function nameSize(name: string) {
  if (name.length > 26) return 60;
  if (name.length > 18) return 76;
  return 100;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spotlight = await getSpotlightByHandle(slug);

  const [display, body, logo] = await Promise.all([
    readFile(FONT_DISPLAY),
    readFile(FONT_BODY),
    readFile(LOGO),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fonts = [
    { name: "Space Grotesk", data: display, weight: 700 as const },
    { name: "Inter", data: body, weight: 600 as const },
  ];

  // Every stored image is a Cloudinary upload from the admin form, so the
  // crop can be face-aware. Anything else falls back to the plain card.
  const photo = spotlight?.imageUrl.startsWith("http")
    ? cloudinaryFill(spotlight.imageUrl, size.width, size.height)
    : null;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#fff",
      }}
    >
      {photo && (
        <>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse renders
              plain img elements through Satori, not the Next image pipeline. */}
          <img
            src={photo}
            alt=""
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size.width,
              height: size.height,
              objectFit: "cover",
            }}
          />
          {/* The photograph is the card, so the text has to earn its contrast
              from a scrim rather than from a panel beside it. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size.width,
              height: size.height,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.78) 26%, rgba(0,0,0,0.2) 56%, rgba(0,0,0,0) 78%)",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: size.width,
          padding: 64,
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 18,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            Spotlight
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontFamily: "Space Grotesk",
              fontSize: nameSize(spotlight?.name ?? "Spotlight"),
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            {spotlight?.name ?? "Spotlight"}
          </div>

          {spotlight && (
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Inter",
                fontSize: 20,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#d4d4d8",
              }}
            >
              {spotlight.role}
            </div>
          )}
        </div>

        {/* The mark is a wordmark, 1659x381, and already reads "Codetopia
            Community". Drawn at its own ratio, on the same baseline as the
            name, so the card composes as subject-left, publisher-right. */}
        {/* biome-ignore lint/performance/noImgElement: see above. */}
        <img src={logoSrc} alt="" width={209} height={48} />
      </div>
    </div>,
    { ...size, fonts },
  );
}
