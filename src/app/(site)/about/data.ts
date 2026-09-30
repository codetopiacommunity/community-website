/**
 * The six values members agree to at signup. These are the same six named on
 * the Code of Conduct page — the two lists must stay in sync, since that is
 * the document every member accepts during portal onboarding.
 */
export const coreValues = [
  {
    title: "Inclusivity",
    description:
      "Nobody gets talked down to here, whatever they don't know yet.",
  },
  {
    title: "Collaboration",
    description:
      "People get better faster in a room with other people. That's most of the point of this.",
  },
  {
    title: "Continuous learning",
    description:
      "Everyone here should be further along in six months than they are today.",
  },
  {
    title: "Practical application",
    description: "We learn by building things, not by collecting certificates.",
  },
  {
    title: "Innovation",
    description:
      "New ideas are welcome from anyone, including the person who joined last week.",
  },
  {
    title: "Integrity",
    description:
      "If it's on someone's record here, they really did it and someone else agreed it was good.",
  },
];

/** What people do here, inward and outward. Members run all of it. */
export const programmes = [
  {
    tag: "Real work",
    description:
      "Our own projects, like this website and our open-source repos, and organisations are welcome to bring work to the people here too.",
  },
  {
    tag: "Teams",
    description:
      "Small groups of members who each own an area. You request to join; a team lead reviews it.",
  },
  {
    tag: "Showing up",
    description:
      "Workshops, meetups and hackathons, online and in person across Ghana.",
  },
  {
    tag: "Sharing what you know",
    description:
      "Articles, how-to guides and talks, published under your name.",
  },
  {
    tag: "Opportunities",
    description:
      "Roles, internships and projects from organisations, posted on our careers board.",
  },
  {
    tag: "Recognition",
    description:
      "Reviewed work goes on your record, and the best of it is featured on the Wall of Impact and in Spotlight.",
  },
];

/**
 * How work gets reviewed and recorded. Deliberately short — anything the
 * prose above already says doesn't earn a second airing as a rule, and
 * joining a team is covered under what happens here.
 */
export const reviewRules = [
  { rule: "Nobody reviews their own work.", detail: null },
  {
    rule: "Reviews come from leads and experts in that area.",
    detail: "A designer's work is judged by designers, code by engineers.",
  },
];

/** What members get in return for volunteering their time. */
export const whatYouGet = [
  {
    title: "Experience",
    description:
      "Real projects with real users, not exercises. You'll be doing the thing, not reading about it.",
  },
  {
    title: "People ahead of you",
    description:
      "People who've already done what you're trying to do, working on the same things you are and willing to help when you're stuck.",
  },
  {
    title: "Something to point at",
    description:
      "When someone asks what you've done, you send a link instead of writing a paragraph about yourself.",
  },
  {
    title: "People who know your work",
    description:
      "The members who reviewed what you made can speak to it, which is more than most CVs can offer.",
  },
];
