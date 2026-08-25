"""PyInstaller runtime hook: environment defaults for the frozen build.

Runs before ``al_dic`` -- or matplotlib, or numba -- is imported.

Deliberately absent: ``NUMBA_CACHE_DIR``. Under ``sys.frozen`` Numba's
``UserProvidedCacheLocator`` delegates to ``_SourceFileBackedLocatorMixin``,
which requires the function's source ``.py`` to exist on disk; inside a bundle
it never does, so the locator declines and the variable is ignored. The cache
always resolves to ``UserWideCacheLocator``. What matters instead is surviving
the case where *that* directory is unwritable, which is handled in
``al_dic._numba_compat``.
"""

import os
import sys
import tempfile

if getattr(sys, "frozen", False):
    _base = (
        os.environ.get("LOCALAPPDATA")
        or os.path.expanduser("~")
        or tempfile.gettempdir()
    )

    # Pin matplotlib's config/cache directory. Without a writable one it falls
    # back to a fresh temp dir per launch, which re-runs the full system font
    # scan every time the application starts.
    os.environ.setdefault(
        "MPLCONFIGDIR", os.path.join(_base, "pyALDIC", "mpl")
    )

    # Immunise against ambient matplotlib configuration on the target machine:
    # matplotlib_fname() probes ./matplotlibrc first, and a frozen app's
    # working directory is whatever launched it -- Explorer, a shortcut's
    # "Start in", or the folder of a double-clicked .aldic.
    os.environ.setdefault("MPLBACKEND", "Agg")
    os.environ.pop("MATPLOTLIBRC", None)
