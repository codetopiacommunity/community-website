export type AboutMemberRecord = {
  name: string;
  username: string;
  roleLabel: string;
  awardName: string;
  period: string;
  domain: string;
  impactSummary: string;
  achievements: string[];
  imageUrl: string;
  profileUrl: string | null;
};

function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <span className="font-sans font-black text-6xl tracking-tighter text-zinc-800 select-none">
        {initials}
      </span>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6">
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 pt-1">
        {label}
      </dt>
      <dd className="font-mono text-sm leading-relaxed text-white">
        {children}
      </dd>
    </div>
  );
}

/**
 * One real recognition, rendered on the About page as evidence for the claim
 * made just above it. The page says members end up with a reviewed, public
 * record; this shows one rather than asking to be taken at their word.
 */
export function MemberRecord({ record }: { record: AboutMemberRecord }) {
  return (
    <figure className="m-0 flex flex-col gap-4">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
        One member&rsquo;s record
      </figcaption>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-8 md:gap-12">
        <div className="aspect-[4/5] max-w-[14rem] overflow-hidden">
          {record.imageUrl ? (
            // biome-ignore lint/performance/noImgElement: remote cloudinary/portal avatar
            <img
              src={record.imageUrl}
              alt={record.name}
              className="w-full h-full object-cover grayscale"
              loading="lazy"
            />
          ) : (
            <Initials name={record.name} />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
              {record.period}
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-sans text-white leading-none">
              {record.awardName}
            </h3>
          </div>

          <dl className="flex flex-col gap-4">
            <Row label="Member">
              {record.name}
              {record.roleLabel ? (
                <span className="text-zinc-400"> · {record.roleLabel}</span>
              ) : null}
            </Row>
            {record.domain ? <Row label="Area">{record.domain}</Row> : null}
            <Row label="What they did">{record.impactSummary}</Row>
            {record.achievements.length > 0 ? (
              <Row label="Specifically">
                <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                  {record.achievements.slice(0, 3).map((achievement) => (
                    <li key={achievement} className="flex gap-2">
                      <span className="text-zinc-600">&middot;</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Row>
            ) : null}
          </dl>

          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-auto pt-2">
            {record.profileUrl ? (
              <a
                href={record.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 border-b border-zinc-800 pb-1 hover:text-white hover:border-white transition-colors duration-200"
              >
                @{record.username} on the portal
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </figure>
  );
}
