/** Standard individual SCY events for club / high school swimmers. */
export const EVENT_OPTIONS = [
  "50 Free",
  "100 Free",
  "200 Free",
  "500 Free",
  "1000/1650 Free",
  "50 Back",
  "100 Back",
  "200 Back",
  "50 Breast",
  "100 Breast",
  "200 Breast",
  "50 Fly",
  "100 Fly",
  "200 Fly",
  "100 IM",
  "200 IM",
  "400 IM",
] as const;

export type SwimEvent = (typeof EVENT_OPTIONS)[number];

export const EVENT_GROUPS: { label: string; events: SwimEvent[] }[] = [
  {
    label: "Freestyle",
    events: ["50 Free", "100 Free", "200 Free", "500 Free", "1000/1650 Free"],
  },
  {
    label: "Backstroke",
    events: ["50 Back", "100 Back", "200 Back"],
  },
  {
    label: "Breaststroke",
    events: ["50 Breast", "100 Breast", "200 Breast"],
  },
  {
    label: "Butterfly",
    events: ["50 Fly", "100 Fly", "200 Fly"],
  },
  {
    label: "Individual medley",
    events: ["100 IM", "200 IM", "400 IM"],
  },
];

export const CONTROLLABLES = [
  {
    id: "sleep",
    title: "Sleep",
    summary: "The controllable that shows up in almost every plateau conversation.",
    body: "Most age-group and high school swimmers are juggling school, practice, and weekends. Sleep is not a lecture — it is part of training. Tracking it helps you notice patterns before a coach or parent has to guess.",
    coachQuestions: [
      "On heavy school nights, what do you recommend I protect first — morning or evening practice recovery?",
      "If I'm consistently under 7 hours, where do you see that show up first in my swimming?",
    ],
  },
  {
    id: "fueling",
    title: "Fueling around practice",
    summary: "Not a diet plan — just not running on empty.",
    body: "Showing up hydrated and having eaten something reasonable before afternoon practice is a controllable. This is not medical nutrition advice — if you have specific needs, talk to a professional.",
    coachQuestions: [
      "Are there meets or practice types where you notice fueling matters more for me?",
      "What do you recommend for recovery nutrition after our hardest sessions?",
    ],
  },
  {
    id: "lifting",
    title: "Lifting and dryland",
    summary: "Helpful for some events — noise for others.",
    body: "Extra strength work can help sprinters and IMers when it is consistent and does not destroy water feel. It is not automatically good. The question is whether your team's dryland fits your events and recovery.",
    coachQuestions: [
      "How should I balance soreness from dryland with sprint feel in the water?",
      "For my events, is the team's lifting schedule aimed at me or mostly general conditioning?",
    ],
  },
  {
    id: "recovery",
    title: "Recovery between doubles",
    summary: "When the team schedule is fixed, recovery is how you survive it.",
    body: "You cannot rewrite the weekly grid. You can control sleep, hydration, and how you treat easy swims. Logging readiness helps you see when the week is winning.",
    coachQuestions: [
      "When we have a hard aerobic week, what recovery habits matter most on your team?",
      "Is there a point where I should tell you I'm flat before it shows up in times?",
    ],
  },
];

export const BODY_EVENT_CARDS = [
  {
    title: "Height and wingspan are orientation, not destiny",
    body: "Longer levers can help in back, fly, and open water; shorter levers can turn over faster in sprints. Your coach chooses event focus — understanding your build helps you buy in to that plan.",
  },
  {
    title: "Age and maturation matter more than parents admit",
    body: "A 13-year-old plateau is often growth and training load, not laziness. Tracking how you feel over months — not days — keeps expectations grounded.",
  },
  {
    title: "Your best event may not be your favorite",
    body: "Teams need depth. Sometimes the coach sees a fit you do not love yet. Controllables help you execute the plan you are on while you earn the conversation about event changes.",
  },
];
