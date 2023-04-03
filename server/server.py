from flask import Flask, jsonify, request
from flask_cors import CORS
from paths import BASE_PROJECT_PATH, DUMP_PATH, SETTINGS_PATH
from paddleocr import PaddleOCR
from methods.file_operations import create_dir, check_file_validity, read_json_as_dict
from helper import build_structure
from methods.ocr_functions import paddle_ocr
from methods.image_processing_functions import draw_rectangles_, save_image, read_img_buffer
import time
import os
import cv2
from dotenv import load_dotenv

# load env file
load_dotenv()
X_KEY = os.getenv('X_KEY')


# ---------------------
# Check Project Structure
# ---------------------
build_structure

app = Flask(__name__)
CORS(app=app)

ocr = PaddleOCR(use_angle_cls=True, show_log=False, lang='en')
ALL_SETTINGS = read_json_as_dict(SETTINGS_PATH)


@app.route('/ocr/check')
def hello_world():
    return jsonify({
        "status": 200,
        "msg": "working!"
    })


@app.route("/ocr/generate-result", methods=["POST"])
def generate_result():

    try:
        All_headers = dict(request.headers)
        if All_headers["X-Key"] == X_KEY:

            data = request.files.getlist('files')

            return_images = []
            file_processed = []
            ocr_data = []
            for ind, incoming_file in enumerate(data):
                # ------------------
                # Build unique folder
                # ------------------
                current_timestamp = str(time.time()).replace(".", "__")
                filesave_folderpath = os.path.join(
                    DUMP_PATH, current_timestamp)
                create_dir(filesave_folderpath)

                # -------------------
                # Check if valid file
                # -------------------
                if check_file_validity(incoming_file.filename):
                    # Download the file
                    filesave_path = os.path.join(
                        filesave_folderpath, incoming_file.filename)
                    incoming_file.save(filesave_path)
                    print("File : {} : saved at : {} ".format(
                        incoming_file.filename, filesave_path))

                    # Run OCR
                    image_read_obj = cv2.imread(filesave_path)
                    paddle_output = paddle_ocr(image_read_obj, ocr)

                    # Draw rectangle
                    for paddle_array in paddle_output:
                        x1, y1, x2, y2 = paddle_array[2][0], paddle_array[2][1], paddle_array[2][2], paddle_array[2][3]
                        image_read_obj = draw_rectangles_(image_read_obj, x1, y1, x2, y2,
                                                          ALL_SETTINGS["Rectangle_color"]["R"],
                                                          ALL_SETTINGS["Rectangle_color"]["G"],
                                                          ALL_SETTINGS["Rectangle_color"]["B"],
                                                          ALL_SETTINGS["Rectangle_thickness"],
                                                          )

                    # save image with rectangle
                    file_ext = incoming_file.filename.split(".")[-1]
                    new_file_name = incoming_file.filename.replace(
                        ".{}".format(file_ext), "edit_.{}".format(file_ext))
                    edit_image_path = os.path.join(
                        filesave_folderpath, new_file_name)
                    save_image(edit_image_path, image_read_obj)

                    # send result
                    return_images.append(read_img_buffer(edit_image_path))

                    # save filename
                    file_processed.append(incoming_file.filename)

                    # save ocr result
                    final__ = ''
                    for zq in paddle_output:
                        final__ += f'{zq[0]}\n'
                    ocr_data.append(final__)

            return jsonify({
                "status": 200,
                "image_data": return_images,
                "files_processed": file_processed,
                "ocr_data": ocr_data
            })
        return jsonify({
            "status": 501,
            "msg": "not allowed",
            "image_data": [],
            "files_processed": [],
            "ocr_data": []
        })
    except Exception as e:
        print("Error :", e)
        return jsonify({
            "status": 502,
            "msg": "error : {}".format(str(e)),
            "image_data": [],
            "files_processed": [],
            "ocr_data": []
        })


if "__main__" == __name__:
    # app.run(host='0.0.0.0', port='4590', debug=True)
    app.run(host='0.0.0.0', port='4590')
