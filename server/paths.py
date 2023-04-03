import os

# --------------------------
# Base Paths
# --------------------------
BASE_PROJECT_PATH = os.getcwd()
METADATA_PATH = os.path.join(BASE_PROJECT_PATH, "metadata")
ASSET_PATH = os.path.join(BASE_PROJECT_PATH, "assets")


# -------------------------
# File Download Paths
# -------------------------
DUMP_PATH = os.path.join(METADATA_PATH, "Dump")

# -----------------------
# Settings path
# -----------------------
SETTINGS_PATH = os.path.join(ASSET_PATH, "settings.json")
