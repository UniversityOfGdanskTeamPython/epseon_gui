#!/usr/bin/env python

"""Build script for epseon_gui package."""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

THIS_DIR = Path(__file__).parent


def build() -> int:
    """Build epseon_gui package."""
    run(THIS_DIR / "frontend", "npm", "-v")
    run(THIS_DIR / "frontend", "npm", "run", "build")
    shutil.copytree(
        (THIS_DIR / "frontend" / "build").as_posix(),
        (THIS_DIR / "backend" / "epseon_gui" / "static").as_posix(),
        dirs_exist_ok=True,
    )
    return 0


def run(current_working_directory: Path | str, *args: str) -> str:
    """Run command specified in args."""
    try:
        r = subprocess.run(
            args=args,
            cwd=Path(current_working_directory).as_posix(),
            capture_output=True,
            check=True,
            shell=True,
        )
    except subprocess.CalledProcessError as e:
        sys.stdout.write(e.stdout.decode("utf-8"))
        sys.stderr.write(e.stderr.decode("utf-8"))
        raise
    else:
        sys.stdout.write(r.stdout.decode("utf-8"))
        sys.stderr.write(r.stderr.decode("utf-8"))
        return r.stdout.decode("utf-8")


if __name__ == "__main__":
    raise SystemExit(build())
