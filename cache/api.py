#!/usr/bin/env python3
import json
from pprint import pprint
from collections import OrderedDict

import champion_roles_parser

############
# Champion #
############

def create_champion_items_dict():
    with open("api_champions.json") as c:
        champs = json.load(c)

    champion_items = {}
    for champ in champs:
        items = champ['items']
        chame = champ['name']
        champion_items[chame] = items

    return champion_items

def print_champions_full():
    # image_url = "https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/"

    with open("champions.json") as champions:
        data = json.load(champions)

    with open("items.json") as items:
        item_data = json.load(items)

    name_roles = champion_roles_parser.parse("champion-roles.txt")

    all_champion_data = []
    for champion in data['data'].keys(): 
        model = []
        input_data = data['data'][champion]
        model.append(('name',input_data['name']))
        model.append(('roles', name_roles[input_data['name']]))
        model.append(('classes',input_data['tags']))
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
        model.append(('image', input_data['image']['full']))

        all_champion_data.append(OrderedDict(model))

    print(json.dumps(all_champion_data, indent=4, separators=(',',': ')))

def print_champion_names():
    with open("champions.json") as champions:
        data = json.load(champions)

    all_champion_names = []
    for champion in data['data'].keys(): 
        name = data['data'][champion]['name']
        all_champion_names.append(name)
    print(json.dumps(all_champion_names, indent=4, separators=(',',': ')))

def find_longest_lore():
    with open("api_champions.json") as champs:
        data = json.load(champs)
    max_len = 0
    for champ in data:
        l = len(champ['lore'])
        if l > max_len:
            max_len = l
    print(max_len)

def find_longest_name():
    with open("api_champions.json") as champs:
        data = json.load(champs)
    max_len = 0
    for champ in data:
        l = len(champ['image'])
        if l > max_len:
            max_len = l
    print(max_len)

########
# Item #
########

def create_item_roles_dict():
    with open("api_champions.json") as c:
        champs = json.load(c)

    item_roles = {}
    for champ in champs:
        roles = set(champ['roles'])
        items = champ['items']

        for item in items:
            if item not in item_roles:
                item_roles[item] = roles
            else:
                item_roles[item] |= roles
        
        result = {}
        for k,v in item_roles.items():
            result[k] = list(v)
    return result

def print_items_full():
    # image_url = "https://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/"
    with open("items.json") as items:
        data = json.load(items)

    item_roles = create_item_roles_dict()

    all_items_data = []
    for item in data['data'].keys(): 
        model = []
        input_data = data['data'][item]
        try:
            name = input_data['name']
            cate = input_data['tags']
            imag = input_data['image']['full']
            model.append(('name',name))
            model.append(('categories', cate))
            model.append(('image', imag))
            model.append(('roles', item_roles[name]))
        except Exception as e:
            pass
        else:
            all_items_data.append(OrderedDict(model))
    print(json.dumps(all_items_data, indent=4, separators=(',',': ')))

#########
# Class #
#########

def create_class_champions_dict():
    with open("api_champions.json") as c:
        champs = json.load(c)

    tag_champions = {}
    for champ in champs:
        chame = champ['name']
        tags = champ['classes']

        for tag in tags:
            if tag == 'Tank,melee':
                tag = 'Tank'
            if tag not in tag_champions:
                tag_champions[tag] = [chame]
            else:
                tag_champions[tag].append(chame)
    return tag_champions

def create_class_descriptions_dict():
    with open("class_descriptions.txt") as cd:
        data = json.load(cd)
    return data

def print_classes_full():
    # img_url = 'leaguedb.me/static/images/'
    class_champions = create_class_champions_dict()
    class_descriptions = create_class_descriptions_dict()
    champion_items = create_champion_items_dict()
    all_class_data = []
    for cl, champs in class_champions.items():
        model = []
        try:
            model.append(('name', cl))
            model.append(('img_url', cl + '.png'))
            model.append(('description', class_descriptions[cl]))
            model.append(('champions', champs))

            all_items = set()
            for champ in class_champions[cl]:
                items = set(champion_items[champ])
                all_items |= items

            model.append(('items', list(all_items)))
        except Exception as e:
            print("bad")
        else:
            all_class_data.append(OrderedDict(model))
    print(json.dumps(all_class_data, indent=4, separators=(',',': ')))

########
# Role #
########

def create_role_champions_dict():
    with open("api_champions.json") as c:
        champs = json.load(c)

    item_champions = {}
    for champ in champs:
        chame = champ['name']
        items = champ['items']

        for item in items:
            if item not in item_champions:
                item_champions[item] = [chame]
            else:
                item_champions[item].append(chame)
    return item_champions


if __name__ == "__main__":
    pass
    # print_champions_full()
    # print_champion_names()
    # find_longest_lore()
    # find_longest_name()
    # ic = create_item_champions_dict()
    # create_item_roles_dict()
    # print_items_full()
    # create_class_descriptions_dict()
    print_classes_full()
    # create_champion_items_dict()

