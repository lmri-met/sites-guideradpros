import http.server
import socketserver
import sys

START_PORT = 8000
DIRECTORY = "docs"

def run_server(start_port=START_PORT, max_tries=100):
    socketserver.TCPServer.allow_reuse_address = True
    for offset in range(max_tries):
        port = start_port + offset
        try:
            handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(*args, directory=DIRECTORY, **kwargs)
            with socketserver.TCPServer(("", port), handler) as httpd:
                print(f"Serving at http://localhost:{port}")
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\nServer stopped by user")
                    return 0
        except OSError as e:
            if getattr(e, "errno", None) == 98:
                print(f"Port {port} in use, trying {port + 1}...")
                continue
            raise
    print("No free port found")
    return 1

if __name__ == "__main__":
    sys.exit(run_server())
