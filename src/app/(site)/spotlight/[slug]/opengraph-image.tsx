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
 * The share card: the same object as the feature page it links to.
 *
 * The photograph on the left, who they are on black beside it. Writing over
 * the photo put the name across people's faces, since most portraits are
 * close-ups, and left the words at the mercy of a light background. Side by
 * side, the face stays clear and the text always reads, even at the small
 * size a feed shows it.
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

const PHOTO_WIDTH = 480;
const PADDING = 64;

/**
 * The name is the loudest thing on the card, so it sets its own size: as big
 * as it can be while its longest word still fits the text column. Space
 * Grotesk's bold capitals average about 0.68em wide.
 */
function nameSize(name: string, columnWidth: number) {
  const longestWord = Math.max(
    ...name.split(/\s+/).map((word) => word.length),
    1,
  );
  return Math.round(Math.min(84, columnWidth / (longestWord * 0.68)));
}

/** A teaser, cut at a word, so it never runs off the bottom of the card. */
function teaser(text: string, max = 140) {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max)).replace(/[,.;:]$/, "")}…`;
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
  // crop can be face-aware. Without a photo the text takes the whole card.
  const photo = spotlight?.imageUrl.startsWith("http")
    ? cloudinaryFill(spotlight.imageUrl, PHOTO_WIDTH * 2, size.height * 2)
    : null;

  const name = spotlight?.name ?? "Spotlight";
  const columnWidth = size.width - (photo ? PHOTO_WIDTH : 0) - PADDING * 2;
  const featuredOn = spotlight
    ? new Date(spotlight.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return new ImageResponse(
    <div
      style={{
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
            width={PHOTO_WIDTH}
            height={size.height}
            style={{
              width: PHOTO_WIDTH,
              height: size.height,
              objectFit: "cover",
            }}
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: columnWidth + PADDING * 2,
          height: size.height,
          padding: PADDING,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a1a1aa",
          }}
        >
          {featuredOn ? `Spotlight · ${featuredOn}` : "Spotlight"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Space Grotesk",
              fontSize: nameSize(name, columnWidth),
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </div>

          {spotlight && (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontFamily: "Space Grotesk",
                fontSize: 20,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#d4d4d8",
              }}
            >
              {spotlight.role}
            </div>
          )}

          {spotlight?.contribution && (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontFamily: "Inter",
                fontSize: 24,
                lineHeight: 1.4,
                color: "#a1a1aa",
              }}
            >
              {teaser(spotlight.contribution)}
            </div>
          )}
        </div>

        {/* The mark is a wordmark, 1659x381, and already reads "Codetopia
            Community", so it signs the card on its own. */}
        {/* biome-ignore lint/performance/noImgElement: see above. */}
        <img src={logoSrc} alt="" width={174} height={40} />
      </div>
    </div>,
    { ...size, fonts },
  );
}
