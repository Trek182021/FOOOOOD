import os
import tempfile
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = '/path/to/the/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename: str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("evaluate", methods=['POST'])
def evaluate():
    if 'file' not in request:
        flash('not file found')
        return
    file = request.files['image']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if not file:
        flash('File not found')
        return
    if not allowed_file(file.filename):
        flash('Not a vallid file type') 
        return

    temp_dir = tempfile.mkdtemp()

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(temp_dir, filename)
        
        file.save(filepath)
        
        # teach the machines

    finally:
        os.rmdir(temp_dir)

    return 'File uploaded successfully'

if __name__ == "__main__":
    app.run(debug=True)