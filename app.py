from flask import Flask, render_template
from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/download")
def download_file():
    return send_from_directory(directory="static/file", path="Resume.png", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
