"""Compare two ``perf_*.csv`` reports and emit a delta table + plot.

Per Q1 (relative thresholds): only flags >20% wall regression and >30%
peak-RSS regression. Does not assert absolute timings.

Usage:
    python tools/compare_perf.py \\
        --baseline reports/perf_v0.4.1.csv \\
        --current  reports/perf_20260425_143000.csv

    python tools/compare_perf.py --baseline ... --current ... --html

Exits 0 if no regression beyond threshold, 1 otherwise — so it can be
wired into a release script.
"""

from __future__ import annotations

import argparse
import csv
import sys
from collections import defaultdict
from pathlib import Path

WALL_REGRESSION_FRAC = 0.20    # 20%
RSS_REGRESSION_FRAC = 0.30     # 30%


def load(path: Path) -> dict[str, list[dict[str, str]]]:
    """Group rows by test_id (multiple machines/runs may coexist)."""
    by_id: dict[str, list[dict[str, str]]] = defaultdict(list)
    with open(path, encoding="utf-8") as fp:
        reader = csv.DictReader(fp)
        for row in reader:
            by_id[row["test_id"]].append(row)
    return by_id


def median(values: list[float]) -> float:
    if not values:
        return 0.0
    sorted_vals = sorted(values)
    n = len(sorted_vals)
    if n % 2:
        return sorted_vals[n // 2]
    return 0.5 * (sorted_vals[n // 2 - 1] + sorted_vals[n // 2])


def summarize(rows: list[dict[str, str]]) -> tuple[float, float]:
    """Return (median_wall, median_peak_rss) skipping skipped rows."""
    walls = [float(r["wall_seconds"]) for r in rows
             if float(r["wall_seconds"]) > 0]
    rsses = [float(r["peak_rss_mb"])  for r in rows
             if float(r["peak_rss_mb"]) > 0]
    return median(walls), median(rsses)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--baseline", required=True, type=Path)
    parser.add_argument("--current",  required=True, type=Path)
    parser.add_argument("--plot", action="store_true",
                        help="write a side-by-side bar chart PNG next to --current")
    args = parser.parse_args()

    if not args.baseline.is_file():
        sys.exit(f"baseline not found: {args.baseline}")
    if not args.current.is_file():
        sys.exit(f"current not found: {args.current}")

    base = load(args.baseline)
    curr = load(args.current)

    common = sorted(set(base) & set(curr))
    only_base = sorted(set(base) - set(curr))
    only_curr = sorted(set(curr) - set(base))

    print(f"\nBaseline: {args.baseline.name}")
    print(f"Current:  {args.current.name}")
    print()
    print(f"{'TEST':<50} {'WALL Δ':>10} {'RSS Δ':>10} {'STATUS'}")
    print("-" * 90)

    regressions: list[tuple[str, float, float]] = []
    for test_id in common:
        base_wall, base_rss = summarize(base[test_id])
        curr_wall, curr_rss = summarize(curr[test_id])
        if base_wall == 0 or base_rss == 0:
            print(f"{test_id:<50} (skipped — baseline missing data)")
            continue
        wall_delta = (curr_wall - base_wall) / base_wall
        rss_delta  = (curr_rss  - base_rss)  / base_rss

        flags = []
        if wall_delta > WALL_REGRESSION_FRAC:
            flags.append("WALL")
        if rss_delta > RSS_REGRESSION_FRAC:
            flags.append("RSS")
        status = "REGRESSION " + "+".join(flags) if flags else "ok"
        if flags:
            regressions.append((test_id, wall_delta, rss_delta))

        print(f"{test_id:<50} {wall_delta * 100:+9.1f}% {rss_delta * 100:+9.1f}%  {status}")

    if only_base:
        print()
        print("In baseline only (test removed?):")
        for tid in only_base:
            print(f"  - {tid}")
    if only_curr:
        print()
        print("In current only (new test?):")
        for tid in only_curr:
            print(f"  + {tid}")

    if args.plot:
        try:
            import matplotlib
            matplotlib.use("Agg")
            import matplotlib.pyplot as plt
        except ImportError:
            sys.exit("matplotlib not available; install or drop --plot")

        labels = common
        base_walls = [summarize(base[t])[0] for t in labels]
        curr_walls = [summarize(curr[t])[0] for t in labels]
        x = range(len(labels))
        fig, ax = plt.subplots(figsize=(max(8, len(labels) * 0.6), 5))
        bw = 0.4
        ax.bar([i - bw / 2 for i in x], base_walls, bw, label="baseline")
        ax.bar([i + bw / 2 for i in x], curr_walls, bw, label="current")
        ax.set_xticks(list(x))
        ax.set_xticklabels(labels, rotation=45, ha="right", fontsize=8)
        ax.set_ylabel("wall time (s)")
        ax.set_title(f"Perf: {args.baseline.stem} vs {args.current.stem}")
        ax.legend()
        ax.grid(axis="y", linestyle="--", alpha=0.4)
        out = args.current.with_suffix(".compare.png")
        fig.tight_layout()
        fig.savefig(out, dpi=150)
        print(f"\nPlot written to {out}")

    if regressions:
        print()
        print(f"❌ {len(regressions)} regression(s) exceed threshold "
              f"(wall>{int(WALL_REGRESSION_FRAC*100)}% or "
              f"rss>{int(RSS_REGRESSION_FRAC*100)}%).")
        sys.exit(1)
    print()
    print("✓ No regressions beyond threshold.")


if __name__ == "__main__":
    main()
