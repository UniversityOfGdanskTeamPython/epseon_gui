"""Command line interface of epseon gui."""
from __future__ import annotations

import webbrowser

import click
import uvicorn


@click.command()
@click.option("-p", "--port", type=int, default=5000)
def main(port: int) -> None:
    """Run epseon gui application."""
    config = uvicorn.Config("epseon_gui.main:app", port=port, log_level="info")
    server = uvicorn.Server(config)
    webbrowser.open(f"http://127.0.0.1:{port}/index.html")
    server.run()


if __name__ == "__main__":
    main()
