import os
import shutil
import json
from paths import SETTINGS_PATH


def create_dir(dir_path: str):
    if not os.path.exists(dir_path):
        os.mkdir(dir_path)


def remove_dir(dir_path: str):
    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)
    else:
        raise Exception("Error : 300 : Folder doesnot exist")


def read_json_as_dict(json_path: str):
    if os.path.exists(json_path):
        with open(json_path) as json_file:
            return json.load(json_file)
    else:
        raise Exception("Error : 301 : Json file doesnot exist")


def check_file_validity(filename: str):
    try:
        APP_SETTINGS = read_json_as_dict(SETTINGS_PATH)
        for filetype in APP_SETTINGS["FILE_TYPES"]:
            if filetype in filename:
                return True
        return False
    except Exception as e:
        print("Error : 303 : Could not check validity  of file : {}".format(filename))
