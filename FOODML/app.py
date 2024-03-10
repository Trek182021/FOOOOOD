import os
import tempfile
import shutil
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename
from predict import FOOODModel


model = FOOODModel()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/path/to/the/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename: str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/evaluate", methods=['POST'])
def evaluate():
    if 'file' not in request.files:
        flash('not file found')
        return
    file = request.files['file']
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

    evaluation = {}

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(temp_dir, filename)
        
        file.save(filepath)
        
        evaluation = model.evaluate_image(filepath)

    finally:
        # os.rmdir(temp_dir)
        shutil.rmtree(temp_dir)

    return evaluation

if __name__ == "__main__":
    app.run(debug=True, port='5000')