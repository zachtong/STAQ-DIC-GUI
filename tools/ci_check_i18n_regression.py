"""Compare i18n unfinished counts between PR head and target branch.

Used exclusively by .github/workflows/i18n.yml Gate B.  Reads two
``tools/i18n.py stats`` outputs and fails if any non-zh_CN language
has a strictly larger unfinished count on the PR side.

Usage:
    python tools/ci_check_i18n_regression.py <main_stats.txt> <pr_stats.txt>

Exit 0 if no regression, 1 if any language regressed.

Extracted from i18n.yml because the previous inline ``python - <<'PY'``
heredoc broke YAML block-scalar indentation rules (Python's
module-level statements cannot carry leading whitespace, yet YAML
requires every line in the block to match the run-step base indent).
"""

from __future__ import annotations

import pathlib
import re
import sys


def parse(path: str) -> dict[str, int]:
    """Return {lang_code: unfinished_count} parsed from ``i18n.py stats``."""
    out: dict[str, int] = {}
    file_path = pathlib.Path(path)
    if not file_path.is_file():
        return out
    pattern = re.compile(r"^(zh_CN|zh_TW|ja|ko|de|fr|es)\s+\d+\s+(\d+)")
    for line in file_path.read_text(encoding="utf-8").splitlines():
        m = pattern.match(line)
        if m:
            out[m.group(1)] = int(m.group(2))
    return out


def main(argv: list[str]) -> int:
    if len(argv) != 3:
        print(
            "usage: ci_check_i18n_regression.py <main_stats.txt> <pr_stats.txt>",
            file=sys.stderr,
        )
        return 2

    main_path, pr_path = argv[1], argv[2]
    main_counts = parse(main_path)
    pr_counts = parse(pr_path)

    regressions = [
        (lang, main_counts[lang], pr_counts[lang])
        for lang in main_counts
        if lang in pr_counts and pr_counts[lang] > main_counts[lang]
    ]

    if regressions:
        print(
            "::error title=i18n regression::Some languages have MORE "
            "unfinished entries than main:"
        )
        for lang, before, after in regressions:
            print(f"  {lang}: {before} -> {after} (+{after - before})")
        print("Fix: add the missing entries to tools/fill_translations.py.")
        return 1

    print("::notice::No regression vs main for any language.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
