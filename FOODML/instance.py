import os
from ultralytics import YOLO

model = YOLO('nano10epoch/segment/train8/weights/best.pt')

results = model(['weinermilk.png'])
for result in results:
    boxes = result.boxes  # Boxes object for bounding box outputs
    masks = result.masks  # Masks object for segmentation masks outputs
    keypoints = result.keypoints  # Keypoints object for pose outputs
    probs = result.probs  # Probs object for classification outputs
    result.show()  # display to screen