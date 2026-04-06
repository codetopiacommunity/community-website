export const encouragedBehaviours = [
  {
    title: "Be inclusive",
    body: "Welcome people of all skill levels. We were all beginners once. Never gatekeep knowledge or make others feel inferior for what they do not yet know.",
  },
  {
    title: "Be collaborative",
    body: "Share knowledge freely. Lift others as you climb. Collective effort drives greater outcomes than individual effort alone.",
  },
  {
    title: "Be respectful",
    body: "Engage with empathy and kindness. Respect different viewpoints and experiences.",
  },
  {
    title: "Be constructive",
    body: "Give feedback that helps people grow. Critique ideas, not people.",
  },
  {
    title: "Be accountable",
    body: "Take responsibility for your actions and contributions. Commit to repairing harm when it occurs.",
  },
  {
    title: "Be a learner",
    body: "Stay curious, stay humble, and embrace the fact that in technology there is always more to learn.",
  },
  {
    title: "Give credit",
    body: "Always properly credit the sources, ideas, and work of others.",
  },
];

export const generalViolations = [
  {
    title: "Harassment",
    body: "Violating explicitly expressed boundaries or engaging in unnecessary personal attention after any clear request to stop.",
  },
  {
    title: "Character attacks",
    body: "Making insulting, demeaning, or pejorative comments directed at a community member or group.",
  },
  {
    title: "Discrimination or stereotyping",
    body: "Characterizing anyone's personality or behaviour on the basis of immutable identities or traits.",
  },
  {
    title: "Sexualization",
    body: "Behaving in a way that would generally be considered inappropriately intimate in the context of the community.",
  },
  {
    title: "Violating confidentiality",
    body: "Sharing or acting on someone's personal or private information without their permission.",
  },
  {
    title: "Endangerment",
    body: "Causing, encouraging, or threatening violence or other harm toward any person or group.",
  },
];

export const techViolations = [
  {
    title: "Gatekeeping",
    body: "Deliberately making others feel unwelcome or inadequate because of their skill level or background.",
  },
  {
    title: "Elitism",
    body: "Dismissing or belittling contributions, questions, or ideas because they are considered too basic or simple.",
  },
  {
    title: "Plagiarism",
    body: "Misrepresenting others' code, ideas, or work as your own.",
  },
  {
    title: "Misleading identity",
    body: "Impersonating someone else or pretending to be someone else to evade enforcement actions.",
  },
  {
    title: "Unsolicited promotion",
    body: "Sharing marketing or commercial content outside the norms of the community.",
  },
];

export const enforcementSteps = [
  {
    step: "01",
    title: "Warning",
    event:
      "A violation involving a single incident or series of minor incidents.",
    consequence: "A private, written warning from the Community Moderators.",
    repair:
      "A private written apology, acknowledgement of responsibility, and seeking clarification on expectations.",
  },
  {
    step: "02",
    title: "Temporarily Limited Activities",
    event:
      "A repeated violation that previously resulted in a warning, or the first incidence of a more serious violation.",
    consequence:
      "A private, written warning with a time-limited cooldown period. The cooldown may be limited to particular channels or interactions.",
    repair:
      "An apology, using the cooldown period to reflect on actions and impact, and being thoughtful about re-entering community spaces.",
  },
  {
    step: "03",
    title: "Temporary Suspension",
    event:
      "A pattern of repeated violations which the Community Moderators have tried to address with warnings, or a single serious violation.",
    consequence:
      "A private written warning with conditions for return from suspension.",
    repair:
      "Respecting the spirit of the suspension, meeting the specified conditions for return, and being thoughtful about reintegrating with the community.",
  },
  {
    step: "04",
    title: "Permanent Ban",
    event:
      "A pattern of repeated violations that other steps have failed to resolve, or a violation so serious that there is no way to keep the community safe with this person as a member.",
    consequence:
      "Access to all Codetopia spaces, tools, and communication channels is permanently removed.",
    repair: "There is no possible repair in cases of this severity.",
  },
];
