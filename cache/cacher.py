import requests
import json
from pathlib import Path
from api_key import personal_api_key  # you have to make this file yourself. It is .gitignore'd to protect api keys
from typing import Dict

"""
Usage:

In this directory, make another file called api_key.py.

That should have one line,
personal_api_key = "WHATEVER"

where WHATEVER is your personal riot api key.
"""


def cache_champions(api_key: str) -> None:
    file_url: str = "champions.json"

    file: Path = Path(file_url)
    if file.is_file():
        print("file is already cached")
        return

    base_url: str = "https://na1.api.riotgames.com/lol/static-data/v3"

    print("Key: " + api_key)
    request_url: str = base_url + "/champions?locale=en_US&tags=all&api_key=" + api_key
    print("Sending request: " + request_url)

    res: Dict = requests.get(request_url).json()

    with open(file_url, "w") as json_file:
        json.dump(res, json_file, indent=2)


def get_image(champ_name: str) -> str:
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champ_name + "_0.jpg"


def cache_items(api_key: str) -> None:
    file_url: str = "items.json"

    file: Path = Path(file_url)
    if file.is_file():
        print("file is already cached")
        return

    base_url: str = "https://na1.api.riotgames.com/lol/static-data/v3"

    request_url: str = base_url + "/items?locale=en_US&tags=all&api_key=" + api_key

    res: Dict = requests.get(request_url).json()

    with open(file_url, "w") as json_file:
        json.dump(res, json_file, indent=2)


if __name__ == "__main__":
    cache_champions(personal_api_key)
    cache_items(personal_api_key)
