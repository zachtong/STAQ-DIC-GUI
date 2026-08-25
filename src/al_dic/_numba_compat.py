r"""Numba availability and JIT-cache probing, shared by every kernel module.

Two separate things have to be settled before the first ``@njit`` decorator
runs: whether Numba is importable at all, and whether its on-disk JIT cache
can actually be established.

The second is not optional. ``@njit(cache=True)`` builds the ``FunctionCache``
at *decoration* time -- while the module is being imported -- and raises
``RuntimeError``, not ``ImportError``, when none of Numba's cache locators
apply. Inside a PyInstaller bundle the source ``.py`` files do not exist on
disk, so every source-file-backed locator declines and only the user-wide one
(``%LOCALAPPDATA%\numba\Cache``) is left; it in turn declines if that
directory cannot be created or written, which is the normal state of affairs
on a machine with a redirected or policy-locked user profile. The resulting
``RuntimeError`` escapes the ``except ImportError`` guards the kernel modules
would otherwise use, and takes ``import al_dic`` down with it -- in a windowed
build, before ``QApplication`` exists, with no window and no message.

Probing once, here, lets every kernel fall back to ``cache=False``: a slower
first run in exchange for still having an application.
"""

from __future__ import annotations

try:
    from numba import njit, prange

    HAS_NUMBA = True
except ImportError:  # pragma: no cover - numba is a core dependency
    HAS_NUMBA = False

    def njit(*args, **kwargs):
        """Pass-through stand-in so kernel modules still import."""

        def decorator(func):
            return func

        if args and callable(args[0]):
            return args[0]
        return decorator

    def prange(*args):
        return range(*args)


def _probe_jit_cache() -> bool:
    """Return True when ``@njit(cache=True)`` can be applied safely.

    Decorating is the whole test: the cache locator chain is walked during
    decoration, so a decorator that returns without raising proves the same
    chain will resolve for the real kernels. Compilation stays lazy, so this
    costs microseconds and never invokes LLVM.
    """
    if not HAS_NUMBA:
        return False
    try:

        @njit(cache=True)
        def _probe(x):  # pragma: no cover - never called
            return x

    except Exception:
        return False
    return True


#: Value to pass as ``cache=`` on every kernel decorator in this package.
JIT_CACHE = _probe_jit_cache()

__all__ = ["HAS_NUMBA", "JIT_CACHE", "njit", "prange"]
