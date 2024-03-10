import os
import shutil
from PIL import Image
import numpy as np
import cv2
import yaml
import random

input_dir = "FoodSeg103/Images"
output_dir = "FoodSeg103Yolo"
os.makedirs(output_dir, exist_ok=True)

def convert_to_yolo_format(ann_array):
    lines: list[str] = []
    present_foods = np.unique(ann_array)
    for food_id in present_foods:
        if food_id == 0: continue
        current_mask = (ann_array == food_id).astype(np.uint8)

        contours, _ = cv2.findContours(current_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            polygon = contour.reshape(-1, 2)

            normalized_polygon = [(point[0] / ann_array.shape[1], point[1] / ann_array.shape[0]) for point in polygon]
            polygon_str = ' '.join(str(chord) for point in normalized_polygon for chord in point)

            lines.append(f'{food_id} {polygon_str}')


    return lines

def process_images(img_folder, ann_folder, output_img_folder, output_label_folder):
    images = os.listdir(img_folder)
    for img_file in images:
        img_src = os.path.join(img_folder, img_file)
        ann_src = os.path.join(ann_folder, os.path.splitext(img_file)[0] + ".png")

        if not os.path.exists(ann_src):
            continue
        shutil.copyfile(img_src, os.path.join(output_img_folder, img_file))

        ann = Image.open(ann_src)
        ann_array = np.array(ann)
        yolo_lines = convert_to_yolo_format(ann_array)
        # ommit empty objects
        if not yolo_lines:
            continue

        with open(os.path.join(output_label_folder, os.path.splitext(img_file)[0] + ".txt"), 'w') as ann_f:
            for line in yolo_lines:
                ann_f.write(line + '\n')

train_img_dir = os.path.join(input_dir, "img_dir", "train")
train_ann_dir = os.path.join(input_dir, "ann_dir", "train")
train_output_img_dir = os.path.join(output_dir, "images", "train")
train_output_label_dir = os.path.join(output_dir, "labels", "train")
os.makedirs(train_output_img_dir, exist_ok=True)
os.makedirs(train_output_label_dir, exist_ok=True)
process_images(train_img_dir, train_ann_dir, train_output_img_dir, train_output_label_dir)

test_img_dir = os.path.join(input_dir, "img_dir", "test")
test_ann_dir = os.path.join(input_dir, "ann_dir", "test")
test_output_img_dir = os.path.join(output_dir, "images", "test")
test_output_label_dir = os.path.join(output_dir, "labels", "test")
os.makedirs(test_output_img_dir, exist_ok=True)
os.makedirs(test_output_label_dir, exist_ok=True)
process_images(test_img_dir, test_ann_dir, test_output_img_dir, test_output_label_dir)

test_images = os.listdir(test_output_img_dir)
random.shuffle(test_images)
num_val = len(test_images) // 2

val_output_img_dir = os.path.join(output_dir, "images", "val")
val_output_label_dir = os.path.join(output_dir, "labels", "val")
os.makedirs(val_output_img_dir, exist_ok=True)
os.makedirs(val_output_label_dir, exist_ok=True)

for img_file in test_images[:num_val]:
    img_src = os.path.join(test_output_img_dir, img_file)
    label_src = os.path.join(test_output_label_dir, img_file)
    shutil.move(img_src, os.path.join(val_output_img_dir, img_file))
    txt_file = os.path.splitext(img_file)[0] + ".txt"
    shutil.move(os.path.join(test_output_label_dir, txt_file), os.path.join(val_output_label_dir, txt_file))

class_names = {}
with open(os.path.join("FoodSeg103", "category_id.txt"), 'r') as f:
    for line in f:
        class_index, class_name = line.strip().split('\t')
        class_names[int(class_index)] = class_name

yaml_config = {
    'path': output_dir,
    'train': f"images/train",
    'val': f"images/val",
    'test': f"images/test",
    'names': {class_index: class_name for class_index, class_name in class_names.items()}
}

with open(os.path.join(output_dir, "dataset.yaml"), 'w') as f:
    f.write("path: {}\n".format(yaml_config['path']))
    f.write("train: {}\n".format(yaml_config['train']))
    f.write("val: {}\n".format(yaml_config['val']))
    if yaml_config['test'] is not None:
        f.write("test: {}\n".format(yaml_config['test']))
    f.write("names:\n")
    for class_index, class_name in yaml_config['names'].items():
        f.write("  {}: {}\n".format(class_index, class_name))