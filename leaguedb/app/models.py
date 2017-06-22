from main import db

# consider many-to-many relationships
 
champion_item_table = db.Table('champion_item',
     db.Column('champion_id', db.Integer, db.ForeignKey('champion.id')),
     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
)

role_item_table = db.Table('role_item',
     db.Column('role_id', db.Integer, db.ForeignKey('role.id')),
     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
)

# models

class Champion (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    role = db.Column(db.String(10))
    clazz = db.Column(db.String(20))
    lore = db.Column(db.String(1000)) #TODO: find out longest lore description
    img_url = db.Column(db.String(100))

    items = db.relationship(
        'Item',
        secondary=champion_item_table,
        backref='champions'
    )

    def __init__(self, id, name, role, clazz, items, lore, img_url):
        self.id = id
        self.name = name
        self.role = role
        self.clazz = clazz
        self.items = items
        self.lore = lore
        self.img_url = img_url

    def __repr__(self):
        return '<Champion' + self.name + '>'

class Item (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    # champions: refer to backref
    categories = db.Column(db.String(20))
    img_url = db.Column(db.String(100))

    roles = db.relationship(
        'Role',
        secondary=role_item_table,
        backref='items'
    )

    def __init__(self, id, name, champions, categories, roles, img_url):
        self.id = id
        self.name = name
        self.champions = champions
        self.categories = categories
        self.roles = roles
        self.img_url = img_url

    def __repr__(self):
        return '<Item' + self.name + '>'

class Class (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    champions = db.Column(db.String(100))
    description = db.Column(db.String(100))
    items = db.Column(db.String(100))
    img_url = db.Column(db.String(100))

    def __init__(self, name, champions, description, items, img_url):
        self.name = name
        self.champions = champions
        self.description = description
        self.items = items
        self.img_url = img_url

    def __repr__(self):
        return '<Class' + self.name + '>'

class Role (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    champions = db.Column(db.String(100))
    # items: refer to backref
    classes = db.Column(db.String(100))
    img_url = db.Column(db.String(100))

    def __init__(self, name, champions, items, classes, img_url):
        self.name = name
        self.champions = champions
        self.items = items
        self.classes = classes
        self.img_url = img_url

    def __repr__(self):
        return '<Role' + self.name + '>'
