import requests
import json

API_KEY = "insert api key here"

def do_the_things(json_path, KEY) :
    HTML_PATH = "champ-htmls/"

    regions = ["na1", "euw1"]
    region = regions[0]

    base_url = "https://" + region + ".api.riotgames.com/lol/static-data/v3"
    tags = ["lore"]

    print ("Key: " + API_KEY)
    request_url = base_url + "/champions?api_key=" + KEY + "".join("&tags="+t for t in tags)
    print ("Sending request: " + request_url)
    all_champs = requests.get(request_url).json()

    dragon_url = "http://ddragon.leagueoflegends.com/cdn/img"

    minimized = {"data" : {} }

    for champ_name in all_champs["data"] :
        minimized["data"][champ_name] = {}
        min_champ_data = minimized["data"][champ_name]
        champ_data = all_champs["data"][champ_name]

        min_champ_data["title"] = champ_data["title"]
        min_champ_data["name"] = champ_data["name"]
        min_champ_data["lore"] = champ_data["lore"]
        image_url = dragon_url + "/champion/loading/" + champ_name + "_0.jpg"
        min_champ_data["img_url"] = image_url

    with open(json_path, "w") as json_file :
        json.dump(minimized, json_file)
    print ("Wrote json to: " + json_path)


if __name__ == "__main__" :
    do_the_things("champions.json", API_KEY)