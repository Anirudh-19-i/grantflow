#!/usr/bin/env python3
"""
Simple HTTP server to serve the GrantFlow dashboard
Runs on http://localhost:3000
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 3000
FRONTEND_DIR = Path(__file__).parent / "frontend"

class FrontendHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(FRONTEND_DIR), **kwargs)
    
    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server():
    """Start the frontend server"""
    os.chdir(FRONTEND_DIR)
    
    with socketserver.TCPServer(("", PORT), FrontendHandler) as httpd:
        print(f"")
        print(f"╔════════════════════════════════════════╗")
        print(f"║  GrantFlow Dashboard                   ║")
        print(f"║  http://localhost:{PORT}               ║")
        print(f"╚════════════════════════════════════════╝")
        print(f"")
        print(f"✅ Server running...")
        print(f"✅ Smart Contract: App ID 1001")
        print(f"✅ Algorand: http://localhost:4001")
        print(f"")
        print(f"Press Ctrl+C to stop")
        print(f"")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")
            sys.exit(0)

if __name__ == "__main__":
    if not FRONTEND_DIR.exists():
        print(f"❌ Frontend directory not found: {FRONTEND_DIR}")
        sys.exit(1)
    
    run_server()
