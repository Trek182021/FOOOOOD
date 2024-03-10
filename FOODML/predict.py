from typing import TypedDict
from ultralytics import YOLO
import cv2
import numpy as np
import uuid
import os
import pandas as pd
from panda import search_nutrients

df = pd.read_csv('nutrients.csv')

class NutritionFacts(TypedDict):
    calories: int
    carbohydrates: int
    protein: int

class Food(TypedDict) :
    description: str
    NutritionFacts: NutritionFacts


class FoodResult(TypedDict):
    name: str
    imageUrl: str
    instances: list[Food]


class FOOODModel:
    model: YOLO
    def __init__(self, pt_file='nano10epoch/segment/train8/weights/best.pt') -> None:
        self.model = YOLO(pt_file)
    
    def evaluate_image(self, file: str) -> FoodResult:
        evaluations: list[FoodResult] = []
        result = self.model([file])[0]

        # keypoints = result.keypoints.cpu()  # Keypoints object for pose outputs
        masks = result.masks.cpu() # Masks object for segmentation masks outputs
        boxes = result.boxes.cpu()
        original_image = result.orig_img
        orig_width = result.orig_shape[0]
        orig_height = result.orig_shape[1]
        # print(dir(result))
        classes = np.array(boxes.data[:, 5].cpu())


        for index,  clss in enumerate(classes):

            mask = masks[index]
            box = boxes[index]
            x1, y1, x2, y2 = np.array(box.xyxyn).ravel()
            x1 = x1 * orig_width
            x2 = x2 * orig_width
            y1 = y1 * orig_height
            y2 = y2 * orig_height
            
            mask_bbox = np.zeros_like(original_image, dtype=np.uint8)
            
            # masked_image = cv2.rectangle(mask_bbox, (int(x1), int(y1)), (int(x2), int(y2)), (255, 255, 255), thickness=cv2.FILLED)
            masked_image = original_image
            for shape in mask.xyn:
                scaled_points = np.array(shape) * np.array([orig_width, orig_height])
                cv2.fillPoly(mask_bbox,  [scaled_points.astype(np.int32)], (255,255,255))

            masked_image = cv2.bitwise_and(original_image, mask_bbox)

            alpha = np.ones((original_image.shape[0], original_image.shape[1]), dtype=np.uint8) * 255
            alpha[np.where((masked_image == [0, 0, 0]).all(axis=2))] = 0
            masked_image = np.dstack((masked_image, alpha))

            file_name = f"{str(uuid.uuid4()) }.png"

            os.makedirs(os.path.join("../files"), exist_ok=True)
            cv2.imwrite(os.path.join("../files", file_name), masked_image)

            food_id = int(clss)
            name = result.names[food_id]

            evaluation: FoodResult = {
                'name': name,
                'imageUrl': file_name,
                'instances': search_nutrients(name) 
            }
            evaluations.append(evaluation)

        return evaluations

if __name__ == '__main__':
    model = FOOODModel()
    evals = model.evaluate_image('test.jpg') 