#!/usr/bin/env python3
from main import db
import json

# consider many-to-many relationships
 
champion_item_table = db.Table('champion_item',
     db.Column('champion_name', db.String(20), db.ForeignKey('champion.name')),
     db.Column('item_name', db.String(35), db.ForeignKey('item.name'))
)

champion_role_table = db.Table('champion_role',
     db.Column('champion_name', db.String(20), db.ForeignKey('champion.name')),
     db.Column('role_name', db.String(5), db.ForeignKey('role.name'))
)

champion_class_table = db.Table('champion_class',
     db.Column('champion_name', db.String(20), db.ForeignKey('champion.name')),
     db.Column('class_name', db.String(20), db.ForeignKey('class.name'))
)

item_role_table = db.Table('item_role',
     db.Column('item_name', db.String(35), db.ForeignKey('item.name')),
     db.Column('role_name', db.String(5), db.ForeignKey('role.name'))
)

item_class_table = db.Table('item_class',
     db.Column('item_name', db.String(35), db.ForeignKey('item.name')),
     db.Column('class_name', db.String(20), db.ForeignKey('class.name'))
)

# models

class Champion (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    icon = db.Column(db.String(20))
    lore = db.Column(db.String(4400))

    roles = db.relationship(
        'Role',
        secondary=champion_role_table,
        backref='champions'
    )
    classes = db.relationship(
        'Class',
        secondary=champion_class_table,
        backref='champions'
    )
    items = db.relationship(
        'Item',
        secondary=champion_item_table,
        backref='champions'
    )

    def __init__(self, name, icon, lore):
        self.name = name
        self.icon = icon
        self.lore = lore

    def __repr__(self):
        return '<Champion %s>' % self.name

class Item (db.Model):
    name = db.Column(db.String(35), primary_key=True)
    icon = db.Column(db.String(40))
    categories = db.Column(db.String(100))

    # champions: refer to backref in class Champion
    roles = db.relationship(
        'Role',
        secondary=item_role_table,
        backref='items'
    )
    classes = db.relationship(
        'Class',
        secondary=item_class_table,
        backref='items'
    )


    def __init__(self, name, icon, categories):
        self.name = name
        self.icon = icon
        self.categories = categories

    def __repr__(self):
        return '<Item %s>' % self.name

class Class (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    icon = db.Column(db.String(20))
    description = db.Column(db.String(1450))

    # champions: refer to backref in class Champion
    # items: refer to backref in class Item

    def __init__(self, name, icon, description):
        self.name = name
        self.icon = icon
        self.description = description

    def __repr__(self):
        return '<Class %s>' % self.name

class Role (db.Model):
    name = db.Column(db.String(5), primary_key=True)
    icon = db.Column(db.String(10))
    classes = db.Column(db.String(70))

    # champions: refer to backref in class Champion
    # items: refer to backref in class Item

    def __init__(self, name, icon, classes):
        self.name = name
        self.icon = icon
        self.classes = classes

    def __repr__(self):
        return '<Role %s>' % self.name

def create_tables():
    db.create_all()
    print("Created tables")

def add_roles_data():
    with open('../../cache/api_roles.json') as f:
        roles = json.load(f)
    for role in roles:
        db_obj = Role(role['name'],
                      role['icon'], 
                      ','.join(role['classes'])
                     )
        db.session.add(db_obj)
    db.session.commit()
    print("Added roles data.")

def add_classes_data():
    with open('../../cache/api_classes.json') as f:
        cls = json.load(f)
    for cl in cls:
        db_obj = Class(cl['name'],
                       cl['icon'], 
                       cl['description']
                      )
        db.session.add(db_obj)
    db.session.commit()
    print("Added classes data.")
    
def add_items_data():
    with open('../../cache/api_items.json') as f:
        items = json.load(f)
    for item in items:
        item_db_obj = Item(item['name'],
                       item['icon'], 
                       item['categories']
                      )
        for role in item['roles']:
            role_db_obj = Role.query.get(role)
            item_db_obj.roles.append(role_db_obj)
        for cl in item['classes']:
            cl_db_obj = Class.query.get(cl)
            item_db_obj.classes.append(cl_db_obj)
        db.session.add(item_db_obj)
    db.session.commit()
    print("Added items data.")

def add_champions_data():
    with open('../../cache/api_champions.json') as f:
        champions = json.load(f)
    for champion in champions:
        c_db_obj = Champion(champion['name'],
                       champion['icon'], 
                       champion['lore']
                      )
        for role in champion['roles']:
            role_db_obj = Role.query.get(role)
            c_db_obj.roles.append(role_db_obj)

        for cl in champion['classes']:
            cl_db_obj = Class.query.get(cl)
            c_db_obj.classes.append(cl_db_obj)

        for item in champion['items']:
            item_db_obj = Item.query.get(item)
            if item_db_obj != None:
                c_db_obj.items.append(item_db_obj)

        db.session.add(c_db_obj)
    db.session.commit()
    print("Added champions data.")

if __name__ == "__main__":
    print("Populating database.")
    create_tables()
    add_roles_data()
    add_classes_data()
    add_items_data()
    add_champions_data()
