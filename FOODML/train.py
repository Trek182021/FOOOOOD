import os
from ultralytics import YOLO


# Load a model
model = YOLO('yolov8n-seg.pt')  # load a pretrained model (recommended for training)

# Train the model
results = model.train(data="dataset.yaml", epochs=10, imgsz=640)