from typing import TypedDict
from ultralytics import YOLO

class NutritionInfo(TypedDict):
    calories: int


class FOOODModelPrediction(TypedDict):
    categories: dict[str, list[str]]


class FOOODModel:
    model: YOLO
    def __init__(self, pt_file='nano10epoch/segment/train8/weights/best.pt') -> None:
        self.model = YOLO(pt_file)
    
    def evaluate_image(self, file: str) -> FOOODModelPrediction:
        evaluation: FOOODModelPrediction = {}
        result = self.model([file])[0]
        class_leaders = result
        masks = result.masks  # Masks object for segmentation masks outputs
        keypoints = result.keypoints  # Keypoints object for pose outputs
        # print(masks.data)
        # print(dir(result))
        # print(result.names)
        # food_ids = result.boxes[:, 5]
        # for food_id in food_ids:
        shape = result.orig_shape


        for mask in masks:
            if 'xy' not in mask: continue
            points = mask.xy

            for (x, y) in points:
                print(x, y)


if __name__ == '__main__':
    model = FOOODModel()
    kodel.evaluate_image('test.jpg') 