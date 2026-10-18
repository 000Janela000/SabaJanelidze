// "How I work": the five steps of the agent workflow, each with one dated fact.
// Rules: general words (a method, not a claim about any one company's code). Never hint that a person reviews each
// PlayTime change (the automatic checks do). Never "109 of 109 commits by an agent".
// Sources (AI proof inventory, research 2026-10-13): 147 = PlayTime's behaviour contract CL-001 to CL-147, CI fails a
// change without an entry; 7 in 4 days = CL-140 to CL-147, live 2026-10-05 to 10-08; 27 / 12 = PlayTime's CI jobs and
// workflow files; 111 / 12 = one audit on Saba's fintech team, 96 confirmed, 12 corrected; 11 of 11 = WasteAway's
// decision table, every decision "decided_by: founder".
type MethodStep = { title: string; text: string; fact: string; source: string };

export const method = {
  heading: "How I work",
  intro:
    "AI coding agents write much of my code. That works only when the checks around them are stricter than the agents. I write those checks and measure them.",
  steps: [
    {
      title: "Plan and rules",
      text: "Every task starts from a written plan and the project's rules, which the agents read first.",
      fact: "147 entries in a behaviour contract that the build checks",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Agents write the code",
      text: "Each agent works on one task, on its own branch.",
      fact: "7 features shipped live in 4 days",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Automatic checks",
      text: "Lint, types, tests and schema checks block anything that fails.",
      fact: "27 automatic checks in 12 pipeline files",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Separate review",
      text: "Separate review agents check the risky parts: money, permissions, data.",
      fact: "111 agent claims re-checked in one audit; 12 corrected",
      source: "my fintech team, 2026",
    },
    {
      title: "A person approves",
      text: "Money, accounts and anything public need a person's yes first.",
      fact: "11 of 11 launch decisions signed off by me",
      source: "WasteAway, Oct 2026",
    },
  ] satisfies MethodStep[],
  // A bounded claim: a regulated buyer distrusts "so it cannot come back".
  loop: "When a new kind of bug gets through, I add an automatic check so it is caught next time.",
};
