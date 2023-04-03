from methods.file_operations import create_dir
from paths import METADATA_PATH, ASSET_PATH, DUMP_PATH
import os

ALL_PATHS = [METADATA_PATH, ASSET_PATH, DUMP_PATH]


# -------------------
# Build Structure
# -------------------
for path in ALL_PATHS:
    if not os.path.exists(path):
        create_dir(path)
