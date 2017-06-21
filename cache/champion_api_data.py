#!/usr/bin/env python3
import json
from pprint import pprint
from collections import OrderedDict

def print_json():
    image_url = "https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/"

    with open("champions.json") as champions:
        data = json.load(champions)

    with open("items.json") as items:
        item_data = json.load(items)

    all_champion_data = []
    for champion in data['data'].keys(): 
        model = []
        input_data = data['data'][champion]
        model.append(('name',input_data['name']))
        # TODO: manually input role by our pro game knowledge
        model.append(('role', "bot/top/sup/jg/mid"))
        model.append(('class',input_data['tags']))
        for index in range(7):
            if input_data['recommended'][index]['map'] in ('SR', 'CLASSIC'):
                all_items_and_counts = []
                for category in input_data['recommended'][index]['blocks']:
                    all_items_and_counts += category['items']

                all_item_ids = []
                for item_and_count in all_items_and_counts:
                    all_item_ids += [item_and_count['id']]

                # remove duplicates
                all_item_ids = list(set(all_item_ids))

                all_item_names = []
                for identity in all_item_ids:
                    all_item_names += [item_data['data'][str(identity)]['name']]

                model.append(('items', all_item_names))
                break
        model.append(('lore',input_data['lore']))
        model.append(('image',image_url + input_data['image']['full']))

        all_champion_data.append(OrderedDict(model))

    print(json.dumps(all_champion_data, indent=4, separators=(',',': ')))

if __name__ == "__main__":
    print_json()
