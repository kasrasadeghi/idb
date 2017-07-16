#!/usr/bin/env python3
from unittest import main, TestCase
from main import app, Champion, Item, Class, Role
from models import db
import json

class TestModels (TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    ############################
    # Basic Site Functionality #
    ############################

    def test_site_home(self):
        r = self.app.get('/')
        self.assertEqual(r.status_code, 200)

    def test_site_champions(self):
        r = self.app.get('/champions')
        self.assertEqual(r.status_code, 200)

    def test_site_items(self):
        r = self.app.get('/items')
        self.assertEqual(r.status_code, 200)

    def test_site_classes(self):
        r = self.app.get('/classes')
        self.assertEqual(r.status_code, 200)

    def test_site_roles(self):
        r = self.app.get('/roles')
        self.assertEqual(r.status_code, 200)
    
    ############
    # Champion #
    ############

    def test_champion_query_exists(self):
        result = Champion.query.all()
        self.assertNotEqual(len(result), 0)

    def test_champion_query_one(self):
        result = Champion.query.get('Draven')
        self.assertEqual(result.name, 'Draven')
        self.assertEqual(result.classes[0].name, 'Marksman')

    def test_champion_order(self):
        result = Champion.query.order_by(Champion.name)
        self.assertEqual(result[0].name, 'Aatrox')
        self.assertEqual(result[1].name, 'Ahri')

    def test_champion_add(self):
        name = 'Test Champion'
        icon = 'Test Icon.png'
        lore = 'Test Champion is the most reliable champion in the ...'
        db_object = Champion(name, icon, lore)
        db.session.add(db_object)

        result = Champion.query.get('Test Champion')
        self.assertEqual(result.name, name)
        self.assertEqual(result.icon, icon)
        self.assertEqual(result.lore, lore)

    def test_champion_api_names(self):
        r = self.app.get('/api/champion_names')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertIn('Thresh', data)
        self.assertIn('Draven', data)
        self.assertIn('Vayne', data)
        self.assertNotIn('vayne', data)

    def test_champion_api_exists(self):
        r = self.app.get('/api/champions')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_champion_api_one(self):
        r = self.app.get('/api/champion/Draven')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data['name'], 'Draven')
        self.assertEqual(data['classes'][0], 'Marksman')
        self.assertNotEqual(len(data), 0)


    ########
    # Item #
    ########

    def test_item_query_exists(self):
        result = Item.query.all()
        self.assertNotEqual(len(result), 0)

    def test_item_query_one(self):
        result = Item.query.get('Statikk Shiv')
        self.assertEqual(result.name, 'Statikk Shiv')

    def test_item_order(self):
        result = Item.query.order_by(Item.name).first()
        self.assertEqual(result.name, 'Abyssal Mask')

    def test_item_add(self):
        name = 'Test Item'
        icon = 'Test Icon.png'
        categories = '{Test,Test,Test,Test}'
        db_object = Item(name, icon, categories)
        db.session.add(db_object)

        result = Item.query.get('Test Item')
        self.assertEqual(result.name, name)
        self.assertEqual(result.icon, icon)
        self.assertEqual(result.categories, categories)

    def test_item_api_exists(self):
        r = self.app.get('/api/items')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertNotEqual(len(data), 0)

    def test_item_api_one(self):
        r = self.app.get('/api/item/Statikk Shiv')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertEqual(data['name'], 'Statikk Shiv')

    #########
    # Class #
    #########

    def test_class_query_exists(self):
        result = Class.query.all()
        self.assertNotEqual(len(result), 0)

    def test_class_query_one_not(self):
        result = Class.query.get('Assassin')
        self.assertEqual(result.name, 'Assassin')

    def test_class_order(self):
        result = Class.query.order_by(Class.name).first()
        self.assertEqual(result.name, 'Assassin')

    def test_class_add(self):
        name = 'Test Class'
        icon = 'Test Icon.png'
        desc = 'Test Class is the most reliable class in the ...'
        db_object = Class(name, icon, desc)
        db.session.add(db_object)

        result = Class.query.get('Test Class')
        self.assertEqual(result.name, name)
        self.assertEqual(result.icon, icon)
        self.assertEqual(result.description, desc)

    def test_class_api_exists(self):
        r = self.app.get('/api/classes')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertNotEqual(len(data), 0)

    def test_class_api_one(self):
        r = self.app.get('/api/class/Marksman')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertEqual(data['name'], 'Marksman')
        self.assertNotEqual(len(data['description']), 0)

    ########
    # Role #
    ########

    def test_role_query_exists(self):
        result = Role.query.all()
        self.assertNotEqual(len(result), 0)

    def test_role_query_one_not(self):
        result = Role.query.get('Bot')
        self.assertEqual(result.name, 'Bot')

    def test_role_order(self):
        result = Role.query.order_by(Role.name).first()
        self.assertEqual(result.name, 'Bot')

    def test_role_add(self):
        name = 'T'
        icon = 'T.png'
        classes = 'Test,Test,Test,Test'
        db_object = Role(name, icon, classes)
        db.session.add(db_object)

        result = Role.query.get('T')
        self.assertEqual(result.name, name)
        self.assertEqual(result.icon, icon)
        self.assertEqual(result.classes, classes)

    def test_role_api_exists(self):
        r = self.app.get('/api/roles')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertNotEqual(len(data), 0)

    def test_role_api_one(self):
        r = self.app.get('/api/role/Bot')
        data = json.loads(r.data.decode('utf-8'))
        self.assertEqual(r.status_code, 200)

        self.assertEqual(data['name'], 'Bot')
        self.assertNotEqual(len(data['classes']), 0)

if __name__ == '__main__':
    main()
