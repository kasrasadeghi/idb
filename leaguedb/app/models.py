from main import db
import json

# consider many-to-many relationships
 
champion_item_table = db.Table('champion_item',
     db.Column('champion_name', db.String(20), db.ForeignKey('champion.name')),
     db.Column('item_name', db.String(30), db.ForeignKey('item.name'))
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
     db.Column('item_name', db.String(30), db.ForeignKey('item.name')),
     db.Column('role_name', db.String(5), db.ForeignKey('role.name'))
)

item_class_table = db.Table('item_class',
     db.Column('item_name', db.String(30), db.ForeignKey('item.name')),
     db.Column('class_name', db.String(20), db.ForeignKey('class.name'))
)

# models

class Champion (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    img_url = db.Column(db.String(20))
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

    def __init__(self, name, img_url, lore):
        self.name = name
        self.img_url = img_url
        self.lore = lore

    def __repr__(self):
        return '<Champion %s>' % self.name

class Item (db.Model):
    name = db.Column(db.String(30), primary_key=True)
    img_url = db.Column(db.String(40))
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


    def __init__(self, name, img_url, categories):
        self.name = name
        self.img_url = img_url
        self.categories = categories

    def __repr__(self):
        return '<Item %s>' % self.name

class Class (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    img_url = db.Column(db.String(20))
    description = db.Column(db.String(1450))

    # champions: refer to backref in class Champion
    # items: refer to backref in class Item

    def __init__(self, name, img_url, description):
        self.name = name
        self.img_url = img_url
        self.description = description

    def __repr__(self):
        return '<Class %s>' % self.name

class Role (db.Model):
    name = db.Column(db.String(5), primary_key=True)
    img_url = db.Column(db.String(10))
    classes = db.Column(db.String(70))

    # champions: refer to backref in class Champion
    # items: refer to backref in class Item

    def __init__(self, name, img_url, classes):
        self.name = name
        self.img_url = img_url
        self.classes = classes

    def __repr__(self):
        return '<Role %s>' % self.name

def create_tables():
    db.create_all()
    print("Created tables")

def add_roles_data():
    with open('../../cache/api_roles.json') as r:
        roles = json.load(r)
    for role in roles:
        db_obj = Role(role['name'],
                      role['img_url'], 
                      ','.join(role['classes'])
                     )
        db.session.add(db_obj)
    db.session.commit()
