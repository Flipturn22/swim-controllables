import type { CheckIn, MeetTime, SleepBucket, WeeklyCheckIn } from "@/lib/types";

export interface TrendInsight {
  title: string;
  body: string;
}

export interface CoachQuestion {
  question: string;
  context: string;
}

function avg(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function sleepBucketScore(bucket: SleepBucket): number {
  switch (bucket) {
    case "rough":
      return 1;
    case "ok":
      return 2;
    case "solid":
      return 3;
  }
}

function bucketLabel(bucket: SleepBucket): string {
  switch (bucket) {
    case "rough":
      return "Rough";
    case "ok":
      return "OK";
    case "solid":
      return "Solid";
  }
}

function checkInsBeforeMeet(checkIns: CheckIn[], meetDate: string, days = 7): CheckIn[] {
  const end = new Date(`${meetDate}T12:00:00`);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return checkIns.filter((c) => {
    const d = new Date(`${c.date}T12:00:00`);
    return d >= start && d < end;
  });
}

function attendanceRate(checkIns: CheckIn[]): number | null {
  if (checkIns.length === 0) return null;
  const full = checkIns.filter((c) => c.practiceAttendance === "full").length;
  return full / checkIns.length;
}

export function buildTrendInsights(
  checkIns: CheckIn[],
  meetTimes: MeetTime[],
  weeklyCheckIns: WeeklyCheckIn[] = []
): TrendInsight[] {
  const insights: TrendInsight[] = [];

  if (checkIns.length === 0) {
    insights.push({
      title: "Start with a few check-ins",
      body: "Log attendance and sleep after practice for a week or two. Patterns show up around meets — not every single day.",
    });
    return insights;
  }

  const recent = checkIns.slice(0, 14);
  const roughNights = recent.filter((c) => c.sleepBucket === "rough").length;
  const solidNights = recent.filter((c) => c.sleepBucket === "solid").length;
  const missed = recent.filter((c) => c.practiceAttendance === "missed").length;

  if (solidNights >= 5) {
    insights.push({
      title: "Sleep has looked solid lately",
      body: `You've logged ${solidNights} solid nights in your last ${recent.length} check-ins. If times are moving, recovery may be one piece working for you.`,
    });
  } else if (roughNights >= 4) {
    insights.push({
      title: "Sleep has been rough lately",
      body: `You've logged ${roughNights} rough nights recently. Worth noticing — not judging. Some swimmers still swim fast on rough sleep; yours is a personal pattern.`,
    });
  }

  if (missed >= 2) {
    insights.push({
      title: "A few practices missed recently",
      body: `You've logged ${missed} missed practices in your last ${recent.length} entries. Showing up is part of your controllables — patterns here are about you, not your coach's plan.`,
    });
  }

  const pbs = meetTimes.filter((t) => t.isPersonalBest);
  if (pbs.length > 0) {
    const latestPb = pbs[0];
    const window = checkInsBeforeMeet(checkIns, latestPb.date);
    if (window.length >= 2) {
      const solidBeforePb = window.filter((c) => c.sleepBucket === "solid").length;
      const roughBeforePb = window.filter((c) => c.sleepBucket === "rough").length;
      if (solidBeforePb >= window.length * 0.5) {
        insights.push({
          title: "Before your latest PB",
          body: `In the week before your ${latestPb.event} PB, most sleep logs were solid. That might matter for you — still not a rule for everyone.`,
        });
      } else if (roughBeforePb >= window.length * 0.5) {
        insights.push({
          title: "Inverse pattern showing up",
          body: `Before your ${latestPb.event} PB, sleep looked rough more often than solid. For you, feel and performance don't always line up — that's useful to know, not an excuse.`,
        });
      }
    }
  }

  if (weeklyCheckIns.length > 0) {
    const latest = weeklyCheckIns[0];
    if (latest.buyIn >= 4) {
      insights.push({
        title: "Buy-in has been strong",
        body: "You've felt mostly connected to your team's plan recently. That kind of week often shows up in how you carry yourself at practice.",
      });
    }
  }

  const rate = attendanceRate(recent);
  if (rate !== null && rate >= 0.85) {
    insights.push({
      title: "Strong attendance streak",
      body: "You've been showing up for most scheduled practices lately. Consistency is one of the controllables coaches notice most.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      title: "You're building a picture",
      body: "Keep logging after practice. The goal is your own trend line over time — especially the week before meets.",
    });
  }

  return insights;
}

export function buildCoachQuestion(
  checkIns: CheckIn[],
  weeklyCheckIns: WeeklyCheckIn[] = []
): CoachQuestion | null {
  if (checkIns.length < 3) return null;

  const recent = checkIns.slice(0, 7);
  const rough = recent.filter((c) => c.sleepBucket === "rough").length;
  const missed = recent.filter((c) => c.practiceAttendance === "missed").length;
  const latestWeekly = weeklyCheckIns[0];

  if (missed >= 2) {
    return {
      question:
        "I've missed a couple practices lately — is there anything on my end I should tighten up before we talk about training?",
      context: "Owns attendance first — not a demand to change the plan.",
    };
  }

  if (rough >= 4) {
    return {
      question:
        "My sleep has been rough most nights lately — could that be affecting how I'm recovering between your sessions?",
      context: "Observation about your controllables — not blaming pool work.",
    };
  }

  if (latestWeekly && latestWeekly.buyIn <= 2) {
    return {
      question:
        "I've been trying to lock in better outside the pool — can we talk about how I can support what you're building this month?",
      context: "Shows ownership when buy-in feels low — opens conversation without attacking the program.",
    };
  }

  return {
    question:
      "I've been tracking sleep and attendance — can we look at whether my off-pool habits are supporting what you're trying to do in the water?",
    context: "A general opener when you do not have a specific trend yet.",
  };
}

export function formatCheckInSummary(c: CheckIn): string {
  const parts = [
    `${bucketLabel(c.sleepBucket)} sleep`,
    `${c.practiceAttendance} practice`,
    `soreness ${c.soreness}/5`,
  ];
  if (c.sleepHours !== undefined) parts.push(`${c.sleepHours}h`);
  if (c.feltSick) parts.push("felt sick");
  return parts.join(" · ");
}
