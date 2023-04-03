import cv2
import os
import base64


def draw_rectangles_(img: list, x1, y1, x2, y2, r, g, b, thickcness):
    """
    Used to draw rectangles on img
    """
    cv2.rectangle(img, (int(x1), int(y1)),
                  (int(x2), int(y2)), (r, g, b), thickcness)
    return img


def save_image(filepath: str, img_obj: list):
    cv2.imwrite(filepath, img_obj)
    return filepath


def read_img_buffer(img_path: str):
    if os.path.exists(img_path):
        with open(img_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return encoded_string.decode()
    else:
        raise Exception("Error : 310 : Image not found .")
