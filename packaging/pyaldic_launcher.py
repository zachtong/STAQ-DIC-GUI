"""Entry script for the frozen Windows bundle.

Deliberately not ``al_dic/__main__.py``: that module calls ``main()`` at import
time, so if anything ever collected it as an ordinary submodule the frozen app
would start a second QApplication. Keeping the frozen entry point in its own
file outside the package removes that possibility entirely.
"""

import multiprocessing
import sys


def _run() -> None:
    from al_dic.gui.app import main

    main()


if __name__ == "__main__":
    # Must precede anything else on Windows: a frozen build re-executes this
    # script in every child process.
    multiprocessing.freeze_support()

    if "--self-test" in sys.argv:
        from al_dic.gui.self_test import main_self_test

        sys.exit(main_self_test(sys.argv))

    _run()
